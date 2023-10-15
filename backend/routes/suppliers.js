const express = require('express');
const router = express.Router();
const {
  getSuppliers,
  getSupplier,
  createSupplier,
  deleteSupplier,
  updateSupplier,
  loginSupplier, // Import the loginSupplier function
} = require('../controllers/supplierController');

// GET all suppliers
router.get('/', getSuppliers);

// GET single supplier
router.get('/:id', getSupplier);

// POST a supplier
router.post('/', createSupplier);

// DELETE a supplier
router.delete('/:id', deleteSupplier);

// UPDATE a supplier
router.patch('/:id', updateSupplier);

// POST login route
router.post('/login', loginSupplier);

module.exports = router;
