class SetAvailableQuantitytoInitialQuantity < ActiveRecord::Migration[6.0]
  def self.up
    Inventory.update_all("available_quantity=initial_quantity")
  end

  def self.down
  end
end
