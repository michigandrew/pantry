class Inventory < ApplicationRecord
    validates :name, presence: true
    validates :quantity, presence: true
end
