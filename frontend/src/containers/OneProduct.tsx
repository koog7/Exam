import React, {useEffect} from 'react';
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useParams} from "react-router-dom";
import {getOnePost} from "./Thunk/ProductSlice.ts";

const OneProduct = () => {

    const productData = useSelector((state: RootState) => state.Product.oneProduct)
    const dispatch = useDispatch<AppDispatch>();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getOnePost(id))
    }, [dispatch , id]);

    useEffect(() => {
        console.log(productData)
    }, [productData]);
    return (
        <Card sx={{ display: 'flex', margin: '20px', border: '1px solid #ccc' }}>
            <CardMedia
                component="img"
                sx={{ width: 450 }}
                image={`http://localhost:8000/images/${productData.image}`}
                alt={123}
            />
            <CardContent sx={{ flex: '1' }}>
                <Typography variant="h5" component="div">
                    {productData.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{width:'250px'}}>
                    {productData.description}
                </Typography>
                <Typography variant="h6" color="primary">
                    Price: ${productData.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Category: {productData.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Seller: {productData.userId.displayName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Contact: {productData.userId.phoneNumber}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default OneProduct;