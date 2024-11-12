import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthenticationCallbackPage } from "../features/auth/ui/AuthenticationCallbackPage";
import { AuthenticationSignoutCallbackPage } from "../features/auth/ui/AuthenticationSignoutCallbackPage";
import { SignIn } from "../features/auth/ui/SignIn";
import { MainFrame } from "../ui/components/mainFrame/mainFrame";
import {BasicAppShell} from "../ui/components/AppShell/appShell";
import LandingPage from "../ui/components/landingPage/landingPage";
import {OrganizationForm} from "../features/organization/ui/organizationForm";
import {AppRoutes} from "./appRoutes";
import {EditOrganization} from "../features/organization/ui/editOrganization";

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
                        <Route path={AppRoutes.createOrganization} element={<OrganizationForm />} />
                        <Route path={AppRoutes.organization} element={<MainFrame />} />
                        <Route path={AppRoutes.editOrganization} element={<EditOrganization />} />
                    </Routes>
                </BasicAppShell>
            </BrowserRouter>
            );
};
