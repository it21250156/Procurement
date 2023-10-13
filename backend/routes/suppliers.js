const express = require('express');
const {
  getSuppliers,
  getSupplier,
  createSupplier,
  deleteSupplier,
  updateSupplier,
} = require('../controllers/supplierController');

const router = express.Router();

// GET all site managers
router.get('/', getSuppliers);

// GET single site managers
router.get('/:id', getSupplier);

//POST a site manager
router.post('/', createSupplier);

//DELETE a site manager
router.delete('/:id', deleteSupplier);

//UPDATE a site manager
router.patch('/:id', updateSupplier);

module.exports = router;
