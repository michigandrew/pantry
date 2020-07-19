class UpdateInventoryDatabase < ActiveRecord::Migration[6.0]
  def change
    change_table :inventories do |t|
      t.rename :quantity, :initial_quantity
      t.float :available_quantity
      t.string :upc_code
    end
  end
end
