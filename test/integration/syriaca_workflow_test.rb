require 'test_helper'
require 'ddiff'

#require File.dirname(__FILE__) + '/session_set_controller'

=begin
This file tests the Pass Through Community workflow.

The Pass Through Community workflow is similar to a Master Community workflow (or the default SoSOL 
workflow) except that the publication/identifiers are not committed to the canon on finalize. 
Instead the changes made by the finalizer are copied back to the submitters origin publication.
Once the publication has been vetted by all the community boards, the "committed" version 
is either (a) submitted to the next community or (b) sent to an external agent.

=end

if Sosol::Application.config.site_identifiers.split(',').include?('SyriacaIdentifier')
  class SyriacaWorkflowTest < ActionController::IntegrationTest
    def compare_publications(a,b)

      pubs_are_matched = true
      a.identifiers.each do |aid|
        id_has_match = false
        b.identifiers.each do |bid|
          if (aid.class.to_s == bid.class.to_s && aid.title == bid.title)
            if (aid.xml_content == bid.xml_content)
              id_has_match = true
              Rails.logger.debug "Identifier match found"
            else
              if aid.xml_content == nil
                Rails.logger.debug a.title + " has nill " + aid.class.to_s + " identifier"
              end
              if bid.xml_content == nil
                Rails.logger.debug b.title + " has nill " + bid.class.to_s + " identifier"
              end
              Rails.logger.debug "Identifier diffs for " + a.title + " " + b.title + " " + aid.class.to_s + " " +  aid.title
              log_diffs(aid.xml_content.to_s, bid.xml_content.to_s )
              #Rails.logger.debug "full xml a " + aid.xml_content
              #Rails.logger.debug "full xml b " + bid.xml_content
            end
          end
        end

        if !id_has_match
          pubs_are_matched = false
          Rails.logger.debug "--Mis matched publication. Id " + aid.title + " " + aid.class.to_s + " are different"
        end
      end

      if pubs_are_matched
        Rails.logger.debug "Publications are matched"
      end

    end

    def log_diffs(a, b)
      a_to_b_diff = a.diff(b)

      plus_str = ""
      minus_str = ""
      a_to_b_diff.diffs.each do |d|
        d.each do |mod|
          if mod[0] == "+"
            plus_str = plus_str + mod[2].chr
          else
            minus_str = minus_str + mod[2].chr
          end
        end
      end

      Rails.logger.debug "added " + plus_str
      Rails.logger.debug "removed " + minus_str

    end

    def output_publication_info(publication)
      Rails.logger.info "-----Publication Info-----"
      Rails.logger.info "--Owner: " + publication.owner.name
      Rails.logger.info "--Title: " + publication.title
      Rails.logger.info "--Status: " + publication.status
      Rails.logger.info "--content"

      publication.identifiers.each do |id|
        Rails.logger.info "---ID title: " + id.title
        Rails.logger.info "---ID class:" + id.class.to_s
        Rails.logger.info "---ID content:"
        if id.xml_content
          Rails.logger.info id.xml_content
        else
          Rails.logger.info "NO CONTENT!"
        end
        #Rails.logger.info "== end Owner: " + publication.owner.name
      end
      Rails.logger.info "==end Owner: " + publication.owner.name
      Rails.logger.info "=====End Publication Info====="
    end
  end

  class SyriacaWorkflowTest < ActionController::IntegrationTest
    context "for community" do
      context "community testing" do
        setup do
          #Rails.logger.level = :debug
          Rails.logger.debug "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx community testing setup xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"


          #users to put on the boards
          @board_user = FactoryGirl.create(:user, :name => "board_man_freaky_bob")

          #a user to submit publications
          @creator_user = FactoryGirl.create(:user, :name => "creator_freaky_syriacan_editor")

          #master board user
          @master_user = FactoryGirl.create(:user, :name => "master_freaky_bob")

          #a general member in the community
          @community_user = FactoryGirl.create(:user, :name => "community_freaky_bob")


          @test_agent_community = FactoryGirl.create(:pass_through_community,
                                               :name => "test_syriaca_community",
                                               :friendly_name => "testy agent",
                                               :allows_self_signup => true,
                                               #:abbreviation => "tc",
                                               :description => "a syriaca comunity for testing",
                                               :pass_to => "https://github.com/perseids-project/srophe-app-data")

          @test_agent_community.members << @community_user
          @test_agent_board = FactoryGirl.create(:syriaca_community_board, :title => "SyriacaTestBoard", :community_id => @test_agent_community.id)
          @test_agent_board.users << @board_user
          @test_agent_decree = FactoryGirl.create(:count_decree,
                                            :board => @test_agent_board,
                                            :trigger => 1.0,
                                            :action => "approve",
                                            :choices => "ok")
          @test_agent_board.decrees << @test_agent_decree
          @place_file = File.read(File.join(File.dirname(__FILE__), 'data', '1000.xml'))


          Rails.logger.debug "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz syriaca community testing setup complete zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
        end

        teardown do
          Rails.logger.debug "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx syriaca community testing teardown begin xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          begin
            ActiveRecord::Base.connection_pool.with_connection do |conn|
              count = 0
              [ @board_user, @creator_user, @master_user, @community_user, @test_agent_community ].each do |entity|
                count = count + 1
                #assert_not_equal entity, nil, count.to_s + " cant be destroyed since it is nil."
                unless entity.nil?
                  entity.reload
                  entity.destroy
                end
              end
            end
          end
          Rails.logger.debug "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz syriaca community testing teardown complete zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"
        end

        should "user creates and submits publication to community"  do
          Rails.logger.debug "BEGIN TEST: user creates and submits publication to community"

          assert_not_equal nil, @test_agent_community, "Community not created"

          #create a publication with a session
          Rails.logger.debug "---Create A New Publication---"
          open_session do |submit_session|
            #submit_session.post 'api/v1/xmlitems/Syriaca?test_user_id=' + @creator_user.id.to_s, @place_file, "CONTENT_TYPE" => 'text/xml'
            submit_session.post 'dmm_api/create/item/Syriaca?test_user_id=' + @creator_user.id.to_s, @place_file, "CONTENT_TYPE" => 'text/xml'
            Rails.logger.debug "--flash is: " + submit_session.flash.inspect
            @publication = @creator_user.publications.first
            @publication.log_info
          end

          Rails.logger.debug "---Publication Created---"
          Rails.logger.debug "---Identifiers for publication " + @publication.title + " are:"

          @publication.identifiers.each do |pi|
            Rails.logger.debug "-identifier-"
            Rails.logger.debug "title is: " +  pi.title
            Rails.logger.debug "was it modified?: " + pi.modified?.to_s
          end

          # set the community
          #open_session do |update_session|
          #  update_session.put "api/v1/publications/#{@publication.id.to_s}" + '?test_user_id=' + @creator_user.id.to_s,
          #    { :community_name => @test_agent_community.name }.to_json, "CONTENT_TYPE" => 'application/json'
          #end

          #submit to the community
          Rails.logger.debug "---Submit Publication---"
          open_session do |submit_session|
            submit_session.post 'publications/' + @publication.id.to_s + '/submit/?test_user_id=' + @creator_user.id.to_s, :submit_comment => "I made a new pub", :community => { :id => @test_agent_community.id.to_s }
            assert_equal "Publication submitted to #{@test_agent_community.friendly_name}.", submit_session.flash[:notice]
            Rails.logger.debug "--flash is: " + submit_session.flash.inspect
          end
          @publication.reload

          #now meta should have it
          assert_equal "submitted", @publication.status, "Publication status not submitted " + @publication.community_id.to_s + " id "

          Rails.logger.debug "---Publication Submitted to Community: " + @publication.community.name

          #board should have 1 publication
          board_publications = Publication.find(:all, :conditions => { :owner_id => @test_agent_board.id, :owner_type => "Board" } )
          assert_equal 1, board_publications.length, "Board does not have 1 publication but rather, " + board_publications.length.to_s + " publications"

          Rails.logger.debug "Community Board has publication"

          #vote on it
          board_publication = board_publications.first

          #find syriaca identifier
          syriaca_identifier = board_publication.identifiers.first

          assert_not_nil  syriaca_identifier, "Did not find the syriaca identifier"
          Rails.logger.debug "Found syriaca identifier, will vote on it"

          #vote on meta publication
          open_session do |meta_session|
            meta_session.post 'publications/vote/' + board_publication.id.to_s + '?test_user_id=' + @board_user.id.to_s, \
              :comment => { :comment => "I vote to agree meta is great", :user_id => @board_user.id, :publication_id => syriaca_identifier.publication.id, :identifier_id => syriaca_identifier.id, :reason => "vote" }, \
              :vote => { :publication_id => syriaca_identifier.publication.id.to_s, :identifier_id => syriaca_identifier.id.to_s, :user_id => @board_user.id.to_s, :board_id => @test_agent_board.id.to_s, :choice => "ok" }

            Rails.logger.debug "--flash is: " + meta_session.flash.inspect

          end

          #reload the publication to get the vote associations to go thru?
          board_publication.reload

          vote_str = "Votes on meta are: "
          board_publication.votes.each do |v|
            vote_str = vote_str + v.choice
          end
          Rails.logger.debug  vote_str

          assert_equal 1, board_publication.votes.length, "publication should have one vote"
          assert_equal 1, board_publication.children.length, "publication should have one child"

          #vote should have changed publication to approved and put to finalizer
          assert_equal "approved", board_publication.status, "publication not approved after vote"
          Rails.logger.debug "--publication approved"

          #now finalizer should have it
          board_final_publication = board_publication.find_finalizer_publication

          assert_equal board_final_publication.status, "finalizing", "Board user's publication is not for finalizing"
          Rails.logger.debug "---Meta Finalizer has publication"

          board_final_identifier = board_final_publication.identifiers.first

          #finalize the meta
          open_session do |meta_finalize_session|

            meta_finalize_session.post 'publications/' + board_final_publication.id.to_s + '/finalize/?test_user_id=' + @board_user.id.to_s, \
              :comment => 'I agree is great and now it is final'

            Rails.logger.debug "--flash is: " + meta_finalize_session.flash.inspect
            Rails.logger.debug "----session data is: " + meta_finalize_session.session.to_hash.inspect
            Rails.logger.debug meta_finalize_session.body
          end

          board_final_publication.reload
          assert_equal "finalized", board_final_publication.status, "board final publication not finalized"

          Rails.logger.debug "committed"

          #compare the publications
          #you must look at the output to check the results of the comparisons
          #final and submitters' copy should have comments and votes
          Rails.logger.debug "++++++++USER PUBLICATION++++++"
          @creator_user.publications.first.log_info

          board_publication.reload
          Rails.logger.debug "++++++++meta BOARD PUBLICATION++++++"
          board_publication.log_info

          Rails.logger.debug "Compare user with meta finalizer publication"
          compare_publications(@creator_user.publications.first, board_final_publication)
          @publication.destroy

          Rails.logger.debug "ENDED TEST: user creates and submits publication to syriaca community"
        end
      end
    end
  end
end