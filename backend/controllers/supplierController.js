const Supplier = require('../models/supplierModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (_id) => {

  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})

}

// get all suppliers
const getSuppliers = async (req, res) => {
  const suppliers = await Supplier.find({}).sort({ createdAt: -1 });

  res.status(200).json(suppliers);
};

// get single supplier
const getSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such supplier' });
  }

  const supplier = await Supplier.findById(id);

  if (!supplier) {
    return res.status(404).json({ error: 'No such supplier found' });
  }

  res.status(200).json(supplier);
};

// create new supplier
const createSupplier = async (req, res) => {
  const { companyname, address, mobileno, email, password } = req.body;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // add to db
  try {
    const supplier = await Supplier.create({
      companyname,
      address,
      mobileno,
      email,
      password: hashedPassword,
    });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete supplier
const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such supplier' });
  }

  const supplier = await Supplier.findOneAndDelete({ _id: id });

  if (!supplier) {
    return res.status(400).json({ error: 'No such supplier found' });
  }

  res.status(200).json(supplier);
};

// update supplier
const updateSupplier = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such supplier' });
  }

  const supplier = await Supplier.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

  if (!supplier) {
    return res.status(400).json({ error: 'No such supplier found' });
  }

  res.status(200).json(supplier);
};

// loginSupplier function in the backend controller
const loginSupplier = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const supplier = await Supplier.findOne({ email });

  if (!supplier) {
    return res.status(401).json({ error: 'Login failed' });
  }

  const passwordMatch = await bcrypt.compare(password, supplier.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: 'Login failed' });
  }

  const token = createToken(supplier._id);

  // Adjust the response structure to include supplier details
  res.status(200).json({
    loginSuccess: true,
    token,
    supplier: {
      _id: supplier._id,
      companyname: supplier.companyname,
      address: supplier.address,
      mobileno: supplier.mobileno,
      email: supplier.email,
     
    }
  });
};




module.exports = {
  getSuppliers,
  getSupplier,
  createSupplier,
  deleteSupplier,
  updateSupplier,
  loginSupplier,
};
