import mongoose from "mongoose";


const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    image:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    },
})

const Product = mongoose.model('Product' , ProductSchema)

export default Product;