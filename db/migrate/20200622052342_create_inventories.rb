class CreateInventories < ActiveRecord::Migration[6.0]
  def change
    create_table :inventories do |t|
      t.string :name, null: false
      t.string :image
      t.float :quantity, null: false
      t.string :description
      t.timestamps
    end
  end
end
