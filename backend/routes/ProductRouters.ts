import express from "express";
import Product from "../models/Product";
import {imagesUpload} from "../multer";
import User from "../models/User";


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

ProductRouter.get('/:id' , async (req ,res , next )=>{
    const {id} = req.params;
    try {
        const getAllProduct = await Product.find({category: id});

        if(!getAllProduct){
            return res.status(400).send({error:'Products not found'})
        }

        res.send(getAllProduct)
    }catch (e) {
        next(e)
    }
})

ProductRouter.get('/oneProduct/:id' , async (req ,res , next )=>{
    const {id} = req.params;
    try {
        const getAllProduct = await Product.findById(id).populate('userId', 'displayName phoneNumber');

        if(!getAllProduct){
            return res.status(400).send({error:'Products not found'})
        }

        res.send(getAllProduct)
    }catch (e) {
        next(e)
    }
})
ProductRouter.delete('/oneProduct/:id' , async (req ,res , next )=>{
    const {id} = req.params;

    const getToken = req.get('Authorization');

    if(!getToken){
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const [_Bearer , token] = getToken.split(' ')

        const findUser = await User.findOne({ token });

        if (!findUser) {
            return res.status(401).send({ error: 'User not found' });
        }

        const product  = await Product.findById(id).populate('userId', 'displayName phoneNumber');

        if(!product ){
            return res.status(400).send({error:'Products not found'})
        }

        if (product.userId._id.toString() !== findUser._id.toString()) {
            return res.status(403).send({ error: 'You are not authorized' });
        }


        await Product.findByIdAndDelete(id);
        res.send({ message: 'Product deleted successfully' });
    }catch (e) {
        next(e)
    }
})
ProductRouter.post('/', imagesUpload.single('image') ,async (req , res , next ) =>{
    const getToken = req.get('Authorization');

    if(!getToken){
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const [_Bearer, token] = getToken.split(' ');

        const UserData = await User.findOne({token: token})

        if (!UserData || !UserData._id) {
            return res.status(400).send({ error: 'User not found' });
        }

        const newProduct = new Product({
            userId: UserData._id,
            title: req.body.title,
            description: req.body.description,
            price:req.body.price,
            image: req.file?.filename,
            category: req.body.category,
        })

        await newProduct.save()
        res.send(newProduct)
    }catch (e) {
        next(e)
    }
})


export default ProductRouter;