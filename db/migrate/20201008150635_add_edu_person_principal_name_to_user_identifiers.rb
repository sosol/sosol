class AddEduPersonPrincipalNameToUserIdentifiers < ActiveRecord::Migration
  def self.up
    add_column :user_identifiers, :edu_person_principal_name, :string
  end

  def self.down
    remove_column :user_identifiers, :edu_person_principal_name
  end
end
