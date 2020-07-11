9.times do |i|
    Inventory.create(
        name: "Inventory #{i + 1}",
        quantity: 1.0,
        description: 'Just Sea Salt'
    )
end