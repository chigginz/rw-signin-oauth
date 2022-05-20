import React from "react";
import {CambianBranding} from "../CambianBranding";
import {AppBar, Toolbar} from "@mui/material";



function SignInMobileToolbar() {
    return (
        <AppBar position="sticky"
                color="default">
            <Toolbar id="header">
                <CambianBranding />
            </Toolbar>
        </AppBar>
    )
};


function SignInDesktopToolbar() {
    return (
        <AppBar position="sticky"
                color="default">
            <Toolbar id="header" >
                <CambianBranding />
            </Toolbar>
        </AppBar>
    )
};

export {
    SignInMobileToolbar,
    SignInDesktopToolbar
};

