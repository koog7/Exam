import React, {useEffect} from 'react';
import ProductCard from "../components/ProductCard.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {getPost} from "./Thunk/ProductSlice.ts";

const Home = () => {

    const productData = useSelector((state: RootState) => state.Product.allProducts)

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getPost())
    }, [dispatch]);


    return (
        <div style={{
            padding: '50px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            marginLeft: '50px'
        }}>
            {productData.map((product) => product? (
                <ProductCard
                    key={product._id}
                    _id={product._id}
                    title={product.title}
                    image={product.image}
                    description={product.description}
                />
            ): (
                <div>
                    <h1>Обьявлений в этой категории нет</h1>
                </div>
            ))}
        </div>

    );
};

export default Home;