import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "react-oidc-context";
import {AppRoutes} from "../../../utils/Router";
import React from "react";

export const AuthenticationSignoutCallbackPage = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    return <div>
        <p>Your are being out</p>
        {!auth.isLoading && <Navigate to={AppRoutes.base}></Navigate>}
        <button onClick={() => navigate(AppRoutes.base)}>Go to dashboard</button>
    </div>
}