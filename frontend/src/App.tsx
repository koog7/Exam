import './App.css'
import Home from "./containers/Home.tsx";
import {Route, Routes} from "react-router-dom";
import LogIn from "./containers/LogIn.tsx";
import Navbar from "./components/Navbar.tsx";
import Registration from "./containers/Registration.tsx";
import Sidebar from "./components/Sidebar.tsx";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./app/store.ts";
import {useEffect} from "react";
import {getPost} from "./containers/Thunk/ProductSlice.ts";


const App = () => {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getPost())
    }, [dispatch]);

    return(
        <>
            <div>
                <Navbar />
            </div>
            <div style={{display:'flex'}}>
                <div>
                    <Sidebar />
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={(
                            <Home />
                        )}/>
                        <Route path="/login" element={(
                            <LogIn />
                        )}/>
                        <Route path="/signup" element={(
                            <Registration />
                        )}/>
                    </Routes>
                </div>
            </div>
        </>
    )

};

export default App
