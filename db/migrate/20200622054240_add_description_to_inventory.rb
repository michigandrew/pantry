class AddDescriptionToInventory < ActiveRecord::Migration[6.0]
  def change
    add_column :inventories, :description, :string
  end
end
