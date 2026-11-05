require 'test_helper'

class AirbrakeTest < ActiveSupport::TestCase
  should 'digest values without the JRuby RBTree extension' do
    digest = Airbrake::TDigest.new
    digest.push([3, 1, 2])

    assert_equal [1, 2, 3], digest.to_a.map(&:mean)
  end
end
