import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosAPI from "../../axios/AxiosAPI.ts";

interface Product{
    _id: string,
    userId: string,
    title: string,
    category: string,
    description: string,
    price: string,
    image: string,
}

interface ProductState{
    allProducts: Product[];
    loader: boolean;
    error: string | null;
}

const initialState: ProductState = {
    allProducts: [],
    loader: false,
    error: null,
};


export const getPost = createAsyncThunk<Product[], void,{ state: RootState }>('product/getProduct' , async () =>{
    try {
        const response = await axiosAPI.get(`/products`);
        return response.data;
    }catch (e) {
        console.error('Error:', error);
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
        builder.addCase(getPost.rejected, (state: ProductState) => {
            state.loader = false;
            state.error = 'error';
        });
    }
})

export const ProductReducer = ProductSlice.reducer;