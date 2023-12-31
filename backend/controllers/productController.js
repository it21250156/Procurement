const Product = require('../models/productModel')
const mongoose = require('mongoose')

//get all products
const getProducts = async (req, res) => {

    const products = await Product.find({}).sort({createdAt: -1})

    res.status(200).json(products)
}

//get a single product
const getProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error: 'No such product'})

    }

    const product = await Product.findById(id)

    if(!product) {

        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)
}


//create new product
const createProduct = async (req, res) => {

    const {pName, pUnit, pQty, pPrice, supplier} = req.body

    //add doc to db
    try{
        const product = await Product.create({pName, pUnit, pQty, pPrice, supplier})
        res.status(200).json(product)

    } catch(error){

        res.status(400).json({error: error.message})
    }
}

//delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error: 'No such product'})

    }

    const product = await Product.findOneAndDelete({_id: id})

    if(!product) {

        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)

} 


//update a product
const updateProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){

        return res.status(404).json({error: 'No such product'})

    }

    const product = await Product. findOneAndUpdate({_id: id}, {

        ...req.body
    })

    if(!product) {

        return res.status(404).json({error: 'No such product'})
    }

    res.status(200).json(product)

}

//GET Products for a specific Supplier
const getSupProducts = async (req, res) => {
    const {supplier} = req.params
  
    if(!mongoose.Types.ObjectId.isValid(supplier)) {
        return res.status(404).json({error:'Supplier Not Found',supplier})
    }
  
    const product = await Product.find({supplier:supplier})
  
    if (!product) {
        return res.status(404).json({error: 'No Products'})
    }
    
    res.status(200).json(product)
  }
  

module.exports = {

    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    getSupProducts
}