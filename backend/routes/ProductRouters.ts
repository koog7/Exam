import express from "express";
import Product from "../models/Product";


const ProductRouter = express.Router();
ProductRouter.use(express.json());

ProductRouter.get('/' , async (req ,res , next )=>{
    try {
        const getAllProduct = await Product.find();

        if(!getAllProduct){
            return res.status(400).send({error:'Products not found'})
        }

        res.send(getAllProduct)
    }catch (e) {
        next(e)
    }
})


export default ProductRouter;