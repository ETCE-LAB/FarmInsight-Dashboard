import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { login, logout } from '../../state/slices/authSlice';
import {Button} from "@mantine/core";


const AuthButton: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
    const dispatch = useDispatch()


    const handleClick = () => {
        if (isLoggedIn) {
            dispatch(logout())
        } else {
            dispatch(login())
        }
    }

    return (
        <Button onClick={handleClick} variant="filled" color="green">{isLoggedIn ? "Logout" : "Login"}</Button>
    )
}

export default AuthButton;
