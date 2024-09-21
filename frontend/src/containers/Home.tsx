import React, {useEffect} from 'react';
import ProductCard from "../components/ProductCard.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";

const Home = () => {

    const productData = useSelector((state: RootState) => state.Product.allProducts)

    useEffect(() => {
        console.log(productData)
    }, [productData]);
    return (
        <div style={{padding:'50px', display:'flex', gap:'30px', marginLeft:'50px'}}>
            {productData.map((product) => (
                <ProductCard
                    key={product._id}
                    _id={product._id}
                    title={product.title}
                    image={product.image}
                    description={product.description}
                />
            ))}
        </div>
    );
};

export default Home;