import {useAuth} from "react-oidc-context";
import React, {useEffect} from "react";
import {ReceiveUserProfile} from "../../userProfile/usaCase/ReceiveUserProfile";

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