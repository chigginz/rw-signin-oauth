import React, {useEffect} from "react";
import {useAuth} from "./security";
import Loader from "./Loader";
import {CircularProgress} from "@mui/material";

function AuthenticationCallback(props) {
    console.log("+++ AuthenticationCallback");
    console.log(window.localStorage.getItem("auth"))
    const {authService} = useAuth();
    console.log(authService.getAuthTokens())

    const [sessionAuthenticated, setSessionAuthenticated] = React.useState(false);

    const waitForAuthentication = async () => {
        if (authService.isAuthenticated()) {
            console.log("AUTHENTICATION CONFIRMED")
            setSessionAuthenticated(true);
        } else if (authService.isPending()) {
            console.log("STILL PENDING")
            delay(1000).then(() => {
                console.log("DELAY TIMER EVENT")
            });
        } else {
            console.log("TOTAL FUCKUP")
        }
    }

    console.log('Is Authenticated : ' + authService.isAuthenticated());
    console.log('Is Pending : ' + authService.isPending());
    useEffect(() => {
        // Update the document title using the browser API
        console.log('use effect');
    });

    if (authService.isPending()) {
        console.log("isPending");
        waitForAuthentication();
        return (
            <Loader active={true}/>
        );
    } else {
        return (<div>AUTHENTICATED</div>);
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export default AuthenticationCallback;