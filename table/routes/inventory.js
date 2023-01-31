const express = require('express');
const Inventory = require('/models/inventory')
const router = express.Router();


// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one inventory item by id
router.get('/:id', Inventory, (req, res) => {
  res.json(res.inventory);
});

// Create a new inventory item
router.post('/', async (req, res) => {
  const inventory = new Inventory({
    inventory_id: req.body.inventory_id,
    inventory_type: req.body.inventory_type,
    item_name: req.body.item_name,
    available_quantity: req.body.available_quantity
  });

  try {
    const newInventory = await inventory.save();
    res.status(201).json(newInventory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing inventory item
router.patch('/:id', Inventory, async (req, res) => {
  if (req.body.inventory_id != null) {
    res.inventory.inventory_id = req.body.inventory_id;
  }
  if (req.body.inventory_type != null) {
    res.inventory.inventory_type = req.body.inventory_type;
  }
  if (req.body.item_name != null) {
    res.inventory.item_name = req.body.item_name;
  }
  if (req.body.available_quantity != null) {
    res.inventory.available_quantity = req.body.available_quantity;
  }

  try {
    const updatedInventory = await res.inventory.save();
    res.json(updatedInventory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', Inventory, async (req, res) => {
    try {
      await res.inventory.remove();
      res.json({ message: 'Deleted inventory item' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


module.exports = router