module Exceptions
  class CommitError < StandardError; end

  class GetBlobError < StandardError
    attr_reader :file, :branch, :path
    def initialize(msg='Exception in Repository#get_blob_from_branch', file='', branch='', path='')
      @file = file
      @branch = branch
      @path = path
      super(msg)
    end
  end
end
