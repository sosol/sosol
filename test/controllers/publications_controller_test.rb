require 'test_helper'

class PublicationsControllerTest < ActionController::TestCase
  def setup
    @user = FactoryBot.create(:user)
    @request.session[:user_id] = @user.id
  end

  def teardown
    @request.session[:user_id] = nil
    @user.destroy
  end

  def test_should_get_index
    get :index, params: {}
    assert_response :success
    assert_not_nil assigns(:publications)
  end

  def test_should_create_new_batch
    if ENV['GITHUB_ACTIONS']
      response = Struct.new(:code, :body).new('200', '<rdf:Description/>')
      NumbersRDF::NumbersHelper.stubs(:identifier_to_numbers_server_response).returns(response)
      NumbersRDF::NumbersHelper.stubs(:identifier_to_title).returns(nil)
    end

    assert_difference('Publication.count') do
      post :create_from_list,
           params: { pn_id_list: 'papyri.info/hgv/3147   papyri.info/hgv/3148' }
      assert_equal 'Publication was successfully created.', flash[:notice]
    end
    assert_equal 2, assigns(:publication).identifiers.size
  end
end
