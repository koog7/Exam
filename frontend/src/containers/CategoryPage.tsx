import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {getCategoryPost} from "./Thunk/ProductSlice.ts";
import {useParams} from "react-router-dom";
import ProductCard from "../components/ProductCard.tsx";

const CategoryPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const {id} = useParams();

    const productData = useSelector((state: RootState) => state.Product.allProducts)

    useEffect(() => {
        dispatch(getCategoryPost(id))
    }, [dispatch , id]);

    return (
        <div style={{
            padding: '50px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            marginLeft: '50px',
            width:'660px'
        }}>
            {productData.length > 0 ? (
                productData.map((product) => (
                    <ProductCard
                        key={product._id}
                        _id={product._id}
                        title={product.title}
                        image={product.image}
                        description={product.description}
                    />
                ))
            ) : (
                <div style={{width:'200px'}}>
                    <h1 style={{width:'200px'}}>Объявлений в этой категории нет</h1>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;