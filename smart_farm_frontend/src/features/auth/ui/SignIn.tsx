import {useAuth} from "react-oidc-context";
import React, {useEffect} from "react";

export const SignIn = () => {
    const auth = useAuth();

    useEffect(() => {
        auth.signinRedirect(
        )
    }, []);
    return <div>
        <button onClick={() => auth.signinRedirect()}>Log in</button>
    </div>
}