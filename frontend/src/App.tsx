import './App.css'
import Home from "./containers/Home.tsx";
import {Route, Routes} from "react-router-dom";
import LogIn from "./containers/LogIn.tsx";
import Navbar from "./components/Navbar.tsx";
import Registration from "./containers/Registration.tsx";
import Sidebar from "./components/Sidebar.tsx";


const App = () => {

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
