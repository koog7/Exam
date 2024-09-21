import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axios/AxiosAPI.ts";

interface Product{
    _id: string,
    userId: string,
    title: string,
    category: string,
    description: string,
    price: number,
    image: string,
}

interface OneProduct{
    _id: string,
    userId: {
        _id: string,
        displayName: string,
        phoneNumber: string,
    },
    title: string,
    category: string,
    description: string,
    price: number,
    image: string,
}

interface ProductPayload {
    title: string;
    photo: File;
    description: string;
    price: number;
    category: string;
    token: string;
}

interface ProductState{
    allProducts: Product[];
    oneProduct: OneProduct[]
    loader: boolean;
    error: string | null;
}

const initialState: ProductState = {
    allProducts: [],
    oneProduct: [],
    loader: false,
    error: null,
};


export const getPost = createAsyncThunk<Product[], void,{ state: RootState }>('product/getProduct' , async () =>{
    try {
        const response = await axiosAPI.get(`/products`);
        return response.data;
    }catch (e) {
        console.error('Error:', e);
    }
})
export const getOnePost = createAsyncThunk<OneProduct[], string,{ state: RootState }>('product/getOneProduct' , async (id) =>{
    try {
        const response = await axiosAPI.get(`/products/oneProduct/${id}`);
        return response.data;
    }catch (e) {
        console.error('Error:', e);
    }
})

export const deletePost = createAsyncThunk<void, {id:string, token:string},{ state: RootState }>('product/deleteProduct' , async ({id , token}) =>{
    try {
        await axiosAPI.delete(`/products/oneProduct/${id}`, {headers: { 'Authorization': `Bearer ${token}` }});
    }catch (e) {
        console.error('Error:', e);
    }
})
export const getCategoryPost = createAsyncThunk<Product[], string,{ state: RootState }>('product/getCategoryProduct' , async (category) =>{
    try {
        const response = await axiosAPI.get(`/products/${category}`);
        return response.data;
    }catch (e) {
        console.error('Error:', e);
    }
})

export const postProduct = createAsyncThunk<Product[], ProductPayload,{ state: RootState }>('product/postProduct' , async (productData) =>{
    try {
        const formData = new FormData();
        formData.append('title', productData.title);
        formData.append('image', productData.photo);
        formData.append('description', productData.description);
        formData.append('price', productData.price.toString());
        formData.append('category', productData.category);

        const response = await axiosAPI.post(`/products`, formData , {headers: { 'Authorization': `Bearer ${productData.token}` }});
        return response.data;
    }catch (e) {
        console.error('Error:', e);
    }
})

export const ProductSlice = createSlice({
    name:'Product',
    initialState,
    reducers:{
        err: (state) => {
            state.error = false;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(getPost.pending, (state: ProductState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(getPost.fulfilled, (state: ProductState, action) => {
            state.allProducts = action.payload;
            state.loader = false;
        });
        builder.addCase(getPost.rejected, (state: ProductState , action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(postProduct.pending, (state: ProductState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(postProduct.fulfilled, (state: ProductState) => {
            state.loader = false;
        });
        builder.addCase(postProduct.rejected, (state: ProductState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(getCategoryPost.pending, (state: ProductState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(getCategoryPost.fulfilled, (state: ProductState, action) => {
            state.allProducts = action.payload;
            state.loader = false;
        });
        builder.addCase(getCategoryPost.rejected, (state: ProductState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(getOnePost.pending, (state: ProductState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(getOnePost.fulfilled, (state: ProductState, action) => {
            state.oneProduct = action.payload;
            state.loader = false;
        });
        builder.addCase(getOnePost.rejected, (state: ProductState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
        builder.addCase(deletePost.pending, (state: ProductState) => {
            state.loader = true;
            state.error = null;
        });
        builder.addCase(deletePost.fulfilled, (state: ProductState) => {
            state.loader = false;
        });
        builder.addCase(deletePost.rejected, (state: ProductState, action) => {
            state.loader = false;
            state.error = action.payload as string;
        });
    }
})

export const ProductReducer = ProductSlice.reducer;