const Supplier = require('../models/supplierModel');
const mongoose = require('mongoose');

// get all suppliers
const getSuppliers = async (req, res) => {
  const suppliers = await Supplier.find({}).sort({ createdAt: -1 });

  res.status(200).json(suppliers);
};

// get single site manager
const getSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such supplier' });
  }

  const supplier = await Supplier.findById(id);

  if (!supplier) {
    return res.status(404).json({ error: 'No such found' });
  }

  res.status(200).json(supplier);
};

// create new site manager
const createSupplier = async (req, res) => {
  const { companyname, address, mobileno, email, password } = req.body;

  // add to db
  try {
    const supplier = await Supplier.create({
      companyname,
      address,
      mobileno,
      email,
      password,
    });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete site manager
const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Supplier' });
  }

  const supplier = await Supplier.findOneAndDelete({ _id: id });

  if (!supplier) {
    return res.status(400).json({ error: 'No such found' });
  }

  res.status(200).json(supplier);
};

//update site manager
const updateSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Supplier' });
  }

  const supplier = await Supplier.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!supplier) {
    return res.status(400).json({ error: 'No such found' });
  }

  res.status(200).json(supplier);
};

module.exports = {
  getSuppliers,
  getSupplier,
  createSupplier,
  deleteSupplier,
  updateSupplier,
};
