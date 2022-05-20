import React from "react";
import {useAuth} from "../security";
import {ProtectedToolbar} from "./toolbar/ProtectedToolBar";
import {PublicDesktopToolbar} from "./toolbar/PublicToolBar";

function Header() {
    const { authService } = useAuth();

    console.log('Authenticated - ' + authService.isAuthenticated());
    return (
        <div>
            { authService.isAuthenticated() ? ProtectedToolbar() : PublicDesktopToolbar() }
        </div>
    );
};

export default Header;
