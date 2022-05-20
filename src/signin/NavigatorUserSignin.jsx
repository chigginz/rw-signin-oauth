import React from "react";
import {Route, Routes} from "react-router-dom";
import Splash from "./pages/Splash";
import {Paper} from "@mui/material";
import {CambianTheme} from "./CambianTheme";
import {setSelectedView} from "./utility";
import User from "./pages/User";

function NavigatorUserSignin() {
    const [currentView, setCurrentView] = React.useState();

    const selectedViewCallback = (selectedView) => {
         console.log('selectedViewCallback : ' + selectedView)
        setSelectedView(selectedView);
        if (selectedView !== currentView) {
            console.log('Current View: ' + currentView + '   Setting Current View to : ' + selectedView)
            setCurrentView(selectedView);
        }
    }

    return (
        <div id="mainContainer">
            <Paper style={{
                            position: 'fixed',
                            top: '1px',
                            bottom: '1px',
                            left: '1px',
                            right: '1px',
                            backgroundColor: CambianTheme.palette.background.default
                         }}>
                <Routes>
                    {/* These are routes that require an authenticated user */}
                    {/**/}
                    <Route exact path='/' element={<User />}/>

                    {/* This is the 'catch all' route if there have been no matches on a specific route */}
                    {/**/}
                    <Route path="*" element={<Splash />}/>
                </Routes>
            </Paper>
        </div>
    );
}


export default NavigatorUserSignin;