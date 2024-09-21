import React, {useEffect} from 'react';
import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useNavigate, useParams} from "react-router-dom";
import {deletePost, getOnePost} from "./Thunk/ProductSlice.ts";

const OneProduct = () => {
    const userData = useSelector((state: RootState) => state.User.user)
    const productData = useSelector((state: RootState) => state.Product.oneProduct)
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getOnePost(id))
    }, [dispatch , id]);

    const isOwner = userData && productData && productData.userId && userData._id === productData.userId._id;

    const deleteUserPost = async () => {
        if(id && userData && userData.token){
            await dispatch(deletePost({id: id , token: userData.token}))
            navigate('/')
            location.reload()
        }
    }

    return (
        <div>
            {productData?(
                <div>
                    <Card sx={{ display: 'flex', margin: '20px', border: '1px solid #ccc' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 450 }}
                            image={`http://localhost:8000/images/${productData.image}`}
                            alt={productData.title}
                        />
                        <CardContent sx={{ flex: '1' }}>
                            <Typography variant="h5" component="div">
                                {productData.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" style={{ width: '250px' }}>
                                {productData.description}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Price: ${productData.price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Category: {productData.category}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Seller: {productData.userId?.displayName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Contact: {productData.userId?.phoneNumber}
                            </Typography>

                            {isOwner ? (
                                <Button variant="contained" onClick={deleteUserPost}>Delete post</Button>
                            ) : <></>}

                        </CardContent>
                    </Card>
                </div>
            ):(
                <div>No data</div>
            )}
        </div>

    );
};

export default OneProduct;