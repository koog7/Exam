import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store.ts";
import {useNavigate} from "react-router-dom";
import {loginUser} from "./Thunk/AuthSlice.ts";
import {Box, Button, TextField} from "@mui/material";

const Registration = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [localError , setLocalError] = useState<boolean>(false)
    const typeError = useSelector((state: RootState) => state.User.error)
    console.log(typeError)
    const [login, setLogin] = useState({
        username: '',
        password: '',
        displayName: '',
        phoneNumber: '',
    });

    const submitData = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const dis = await dispatch(loginUser(login));

            if (dis.type === 'users/singIn/rejected'){
                setLocalError(true)
            }else{
                navigate('/');
            }

        } catch (error) {
            console.log('Unexpected Error:', error);
        }

    };

    return (
        <div style={{marginLeft: '360px'}}>
            <h2>Sign Up</h2>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '300px',
                    marginLeft:'-107px',
                    gap: 2,

                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Username"
                    variant="filled"
                    fullWidth
                    required={true}
                    value={login.username}
                    onChange={(e) =>
                        setLogin({...login, username: e.target.value})
                    }
                    InputProps={{
                        style: {backgroundColor: 'white'},
                    }}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="filled"
                    fullWidth
                    value={login.password}
                    onChange={(e) =>
                        setLogin({...login, password: e.target.value})
                    }
                    InputProps={{
                        style: {backgroundColor: 'white'},
                    }}
                />
                <TextField
                    label="Display name"
                    variant="filled"
                    fullWidth
                    value={login.displayName}
                    onChange={(e) =>
                        setLogin({...login, displayName: e.target.value})
                    }
                    InputProps={{
                        style: {backgroundColor: 'white'},
                    }}
                />
                <TextField
                    label="Phone number"
                    variant="filled"
                    fullWidth
                    value={login.phoneNumber}
                    onChange={(e) =>
                        setLogin({...login, phoneNumber: e.target.value})
                    }
                    InputProps={{
                        style: {backgroundColor: 'white'},
                    }}
                />
                {localError && (
                    <div>
                        <p style={{color: 'red'}}>{typeError}</p>
                    </div>
                )}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        '&:hover': {
                            backgroundColor: '#f0f0f0',
                        },
                    }}
                    onClick={submitData}
                    fullWidth>
                    Enter
                </Button>
            </Box>
        </div>
    );
};

export default Registration;