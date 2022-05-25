import {useAuth} from "./security";
import React, {useEffect} from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

// Please see https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
function ProtectedRoute({ children }) {
    const [childComponent, setChildComponent] = React.useState(<Loader active={true} />);
    const { authService } = useAuth();
    let navigate = useNavigate();

    const checkLoginProgress = () => {
        console.log('checkLoginProgress')
        if (authService.isPending()) {
            authService.logout(true)
                .then(value => {
                    navigate('/');
                }, value => {
                    navigate('/');
                });
        }
    }

    useEffect(() => {
        if (authService.isAuthenticated() === false) {
            /*if (authService.isPending()) {
                console.log("Authorization is pending");
                let pendingTimeout = window.setTimeout(() => {
                    checkLoginProgress();
                }, 5000);
            } else {*/
                let signInUrl = "/sign-in?preAuthUri=" + window.location.href;
                navigate(signInUrl);
                // navigate('/public');
            //}
        } else {
            setChildComponent(children);
        }
    });

    return childComponent;
}



export default ProtectedRoute;