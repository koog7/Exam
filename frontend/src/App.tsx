import './App.css'
import Home from "./containers/Home.tsx";
import {Route, Routes} from "react-router-dom";
import LogIn from "./containers/LogIn.tsx";
import Navbar from "./components/Navbar.tsx";
import Registration from "./containers/Registration.tsx";
import Sidebar from "./components/Sidebar.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./app/store.ts";
import {useEffect} from "react";
import {getPost} from "./containers/Thunk/ProductSlice.ts";
import ProductCreate from "./containers/ProductCreate.tsx";
import CategoryPage from "./containers/CategoryPage.tsx";
import OneProduct from "./containers/OneProduct.tsx";


const App = () => {

    const loader = useSelector((state: RootState) => state.Product.loader)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getPost())
    }, [dispatch]);

    return(
        <>
            <div>
                <Navbar />
            </div>
            <div style={{display: 'flex'}}>
                <div>
                    <Sidebar/>
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={(
                            <Home/>
                        )}/>
                        <Route path="/login" element={(
                            <LogIn/>
                        )}/>
                        <Route path="/signup" element={(
                            <Registration/>
                        )}/>
                        <Route path="/createPost" element={(
                            <ProductCreate/>
                        )}/>
                        <Route path="/products/:id" element={(
                            <CategoryPage/>
                        )}/>
                        <Route path="/product/byOne/:id" element={(
                            <OneProduct/>
                        )}/>
                    </Routes>
                </div>
                <div id="loader-container" style={{display: loader ? 'block' : 'none'}}>
                    <div className="loader"></div>
                </div>
            </div>
        </>
    )

};

export default App
