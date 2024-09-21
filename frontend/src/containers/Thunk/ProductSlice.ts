import {createSlice} from "@reduxjs/toolkit";

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

export const ProductSlice = createSlice({
    name:'Product',
    initialState,
    reducers:{
        err: (state) => {
            state.error = false;
        },
    },
})

export const ProductReducer = ProductSlice.reducer;