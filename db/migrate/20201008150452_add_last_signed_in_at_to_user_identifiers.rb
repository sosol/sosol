class AddLastSignedInAtToUserIdentifiers < ActiveRecord::Migration
  def self.up
    add_column :user_identifiers, :last_signed_in_at, :datetime
  end

  def self.down
    remove_column :user_identifiers, :last_signed_in_at
  end
end
