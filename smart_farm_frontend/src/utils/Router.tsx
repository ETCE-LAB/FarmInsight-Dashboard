import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthenticationCallbackPage } from "../features/auth/ui/AuthenticationCallbackPage";
import { AuthenticationSignoutCallbackPage } from "../features/auth/ui/AuthenticationSignoutCallbackPage";
import { SignIn } from "../features/auth/ui/SignIn";
import { Header } from "../ui/components/header/Header";
import { MainFrame } from "../ui/components/mainFrame/mainFrame";

export class AuthRoutes {
    static callback = "auth/callback";
    static signout_callback = "auth/signout-callback"
    static signin = "auth/signin"
}

export class AppRoutes {
    static base = "/"
}

export const Router = () => {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Header />
                    <div style={{ display: 'flex', flex: 1 }}>
                        <Routes>
                            <Route path={AuthRoutes.callback} element={<AuthenticationCallbackPage />} />
                            <Route path={AuthRoutes.signout_callback} element={<AuthenticationSignoutCallbackPage />} />
                            <Route path={AuthRoutes.signin} element={<SignIn />} />
                            <Route path={AppRoutes.base} element={<MainFrame />} />
                        </Routes>
                    </div>
            </div>
        </BrowserRouter>
    );
};
