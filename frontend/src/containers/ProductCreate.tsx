import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Box, Button, TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {postProduct} from "./Thunk/ProductSlice.ts";
import {useNavigate} from "react-router-dom";

const ProductCreate = () => {

    const urlFile = useRef(null)
    const [file, setFile] = useState<File | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [error , setError] = useState<boolean>(false);
    const userData = useSelector((state: RootState) => state.User.user)


    useEffect(() => {
        if(!userData){
            navigate('/')
        }
    }, [userData]);

    const [productData, setProductData] = useState({
        token: userData?.token,
        title: '',
        description: '',
        price: '',
        category: 'cars',
    });


    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files

        if (fileInput && fileInput[0]) {
            setFile(fileInput[0])
        } else {
            setFile(null)
        }
    }

    const onSubmit = async (e: ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();

        const productPayload = {
            title: productData.title,
            photo: file,
            description: productData.description,
            price: parseFloat(productData.price),
            category: productData.category,
            token: userData?.token,
        };

        if (productPayload.price < 0) {
            return;
        }
        try{
            if(productData.title && productData.description && productData.price && file){
                await dispatch(postProduct(productPayload))
                await navigate('/')
                location.reload()
            }else{
                setError(true)
            }
        }catch (e) {
            console.error("Ошибка при отправке продукта", e);
        }
    }

    return (
        <div style={{padding: '50px', marginLeft:'200px'}}>
            <div>
                <h2 style={{marginLeft: '35px'}}>Create product post</h2>
                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '300px',
                            margin: '40px auto',
                            gap: 2,

                        }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            label="Title"
                            variant="filled"
                            fullWidth
                            value={productData.title}
                            onChange={(e) =>
                                setProductData({...productData, title: e.target.value})
                            }
                            InputProps={{
                                style: {backgroundColor: 'white'},
                            }}
                        />
                        <TextField
                            label="Description"
                            type="text"
                            variant="filled"
                            fullWidth
                            value={productData.description}
                            onChange={(e) =>
                                setProductData({...productData, description: e.target.value})
                            }
                            InputProps={{
                                style: {backgroundColor: 'white'},
                            }}
                        />
                        <TextField
                            label="Price"
                            type="number"
                            variant="filled"
                            fullWidth
                            value={productData.price}
                            inputProps={{ min: 0 }}
                            onChange={(e) =>
                                setProductData({...productData, price: e.target.value})
                            }
                            InputProps={{
                                style: {backgroundColor: 'white'},
                            }}
                        />
                        <input type={"file"} ref={urlFile} accept="image/*" onChange={onFileChange}/>
                        <div>
                            <label style={{marginRight: '20px'}}>Choose category</label>
                            <select name="select" value={productData.category} onChange={(e) => setProductData({...productData, category: e.target.value})}>
                                <option value="cars">Cars</option>
                                <option value="helicopter">Helicopters</option>
                                <option value="boats">Boats</option>
                            </select>

                        </div>
                        {error?(
                            <div style={{color:'red'}}>Some field are empty</div>
                        ):(
                            <></>
                        )}
                        <Button
                            variant="contained"
                            type={"submit"}
                            sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                },
                            }}
                            fullWidth>
                            Enter
                        </Button>
                    </Box>
        </div>
    </div>);
};

export default ProductCreate;