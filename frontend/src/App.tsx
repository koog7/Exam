import './App.css'
import Home from "./containers/Home.tsx";
import {Route, Routes} from "react-router-dom";
import LogIn from "./containers/LogIn.tsx";
import Navbar from "./components/Navbar.tsx";
import Registration from "./containers/Registration.tsx";

const App = () => {

    return(
        <>
            <div>
                <Navbar />
            </div>
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
        </>
    )

};

export default App
