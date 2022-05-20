import React, {useEffect} from "react";
import {useAuth} from "../security";
import background from "../images/cloud_background.jpeg";


function SignIn() {
    const { authService } = useAuth();
    console.log("+++ SignIn");
    useEffect(() => {
        authService.login();
    });

    return (
        <div  style={
            {
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'round',
                flexGrow: 1,
        //        minHeight: '90vh',
                minWidth: '90vw'
            }
        } />
    );
}

export {
    SignIn
};