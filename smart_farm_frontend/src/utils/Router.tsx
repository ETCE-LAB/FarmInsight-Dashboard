
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthenticationCallbackPage} from "../features/auth/ui/AuthenticationCallbackPage";
import {AuthenticationSignoutCallbackPage} from "../features/auth/ui/AuthenticationSignoutCallbackPage";
import {SignIn} from "../features/auth/ui/SignIn";
import {LoginButton} from "../ui/components/header/loginButton";
import {LogoutButton} from "../ui/components/header/logoutButton";
import { Header_Tabs } from "../ui/components/header/Header_Tabs";

export class AuthRoutes {
    static callback = "auth/callback";
    static signout_callback = "auth/signout-callback"
    static signin = "auth/signin"
}

export class AppRoutes {
    static base = "/"
}


export const Router = () =>{
    return <BrowserRouter>
        <Header_Tabs/>
        <Routes>
            <Route path={AuthRoutes.callback} element={<AuthenticationCallbackPage/>}></Route>
            <Route path={AuthRoutes.signout_callback} element={<AuthenticationSignoutCallbackPage/>}></Route>
            <Route path={AuthRoutes.signin} element={<SignIn />}></Route>
        </Routes>
    </BrowserRouter>
}