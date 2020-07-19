class AddDepletedColumnsToInventory < ActiveRecord::Migration[6.0]
  def change
    add_column :inventories, :is_depleted, :boolean
    add_column :inventories, :depleted_at, :datetime
  end
end
