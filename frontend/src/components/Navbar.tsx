import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {logout} from "../containers/Thunk/AuthSlice.ts";

const Navbar = () => {

    const userData = useSelector((state: RootState) => state.User.user)
    const dispatch = useDispatch();

    const logOut = async () => {
        if(userData){
            await dispatch(logout(userData.token))
            localStorage.removeItem("persist:exam:User");
            location.reload()
        }
    }
    return (
        <div>
            <AppBar position="static" sx={{backgroundColor:'#424242' , minWidth:'800px'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <NavLink to={'/'} style={{textDecoration:'none', color:'white'}}>
                            Ex
                        </NavLink>
                    </Typography>
                    {userData? (
                        <div style={{display:'flex', alignItems:'center'}}>
                            <p style={{fontSize:'18px', marginTop:'15px', marginRight:'10px'}}>Welcome, {userData.username}!</p>
                            <NavLink to={'/createPost'}>
                                <Button color="inherit" style={{color:'white'}}>Create new post</Button>
                            </NavLink>
                            <p style={{fontSize:'18px', margin: '10px 10px 10px 0'}}>or</p>
                            <Button color="inherit" onClick={logOut}>Log out</Button>
                        </div>
                    ):(
                        <div>
                            <NavLink to={'/login'}>
                                <Button color="inherit">Log in</Button>
                            </NavLink>
                            <NavLink to={'/signup'}>
                                <Button color="inherit">Sign up</Button>
                            </NavLink>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;