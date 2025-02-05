import { AppShell } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import React, { PropsWithChildren } from "react";
import { AppShell_Header } from "./components/appShell_Header"; // Import the header component
import { AppShell_Navbar } from "./components/appShell_Navbar";
import {useAuth} from "react-oidc-context";
import {AppRoutes} from "../../../utils/appRoutes"; // Import the navbar component
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const BasicAppShell: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const auth = useAuth();
    const location = useLocation();
    const noNavbarRoutes = [AppRoutes.base];
    const showNavbar = auth.isAuthenticated && !noNavbarRoutes.includes(location.pathname);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            const lastVisitedOrganization = localStorage.getItem("lastVisitedOrganization");
            const redirectedFlag = sessionStorage.getItem("redirectedOnce");

            if (lastVisitedOrganization && !redirectedFlag) {
                navigate(AppRoutes.organization.replace(":organizationId", lastVisitedOrganization));
                sessionStorage.setItem("redirectedOnce", "true");
            }
        }
    }, [auth.isAuthenticated, navigate]);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: "15vw", breakpoint: 'sm' }}
            padding="md"
        >
            <AppShell.Header>
                <AppShell_Header />
            </AppShell.Header>

            {showNavbar && (
                <AppShell.Navbar>
                    <AppShell_Navbar />
                </AppShell.Navbar>
            )}

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
};
