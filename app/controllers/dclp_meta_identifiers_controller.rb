include DCLPMetaIdentifierHelper

require 'net/http'

class DCLPMetaIdentifiersController < DCLPCurrentMetaIdentifiersController
  protected
  # Sets the identifier instance variable values
  # - *Params*  :
  #   - +id+ -> id from identifier table of the DCLP Text or Meta
  def find_identifier
    @identifier = DCLPMetaIdentifier.find(params[:id].to_s)
  end
end
