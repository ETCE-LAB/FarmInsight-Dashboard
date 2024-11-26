import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthenticationCallbackPage } from "../features/auth/ui/AuthenticationCallbackPage";
import { AuthenticationSignoutCallbackPage } from "../features/auth/ui/AuthenticationSignoutCallbackPage";
import { SignIn } from "../features/auth/ui/SignIn";
import {BasicAppShell} from "../ui/components/AppShell/appShell";
import LandingPage from "../ui/components/landingPage/landingPage";
import {AppRoutes} from "./appRoutes";
import {EditOrganization} from "../features/organization/ui/editOrganization";
import {EditUserProfile} from "../features/userProfile/ui/editUserProfile";
import {MainFrame} from "../ui/components/mainFrame/mainFrame";

export class AuthRoutes {
    static callback = "auth/callback";
    static signout_callback = "auth/signout-callback"
    static signin = "auth/signin"
}


export const Router = () => {
    return (
        <BrowserRouter>
            <BasicAppShell>
                <Routes>
                    <Route path={AuthRoutes.callback} element={<AuthenticationCallbackPage />} />
                    <Route path={AuthRoutes.signout_callback} element={<AuthenticationSignoutCallbackPage />} />
                    <Route path={AuthRoutes.signin} element={<SignIn />} />
                    <Route path={AppRoutes.base} element={<LandingPage />} />
                    <Route path={AppRoutes.organization} element={<EditOrganization />} />
                    <Route path={AppRoutes.editUserProfile} element={<EditUserProfile />} />
                    <Route path={AppRoutes.editFpf} element={<MainFrame />} />
                </Routes>
            </BasicAppShell>
        </BrowserRouter>
    );
};
