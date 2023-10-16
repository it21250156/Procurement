const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({

    pName :{
        type: String,
        required: true
    },
    pUnit: {
        type: String,
        required: true
    },
    pQty: {
        type: Number,
        required: true
    },
    pPrice: {
        type: Number,
        required: true
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
      }

},{ timestamps: true})

module.exports = mongoose.model('Product', productSchema)
