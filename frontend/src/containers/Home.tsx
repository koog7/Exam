import React from 'react';
import ProductCard from "../components/ProductCard.tsx";

const Home = () => {

    return (
        <div style={{padding:'50px', display:'flex', gap:'30px', marginLeft:'50px'}}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    );
};

export default Home;