import React, {useEffect} from "react";
import {useAuth} from "../security";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useApolloClient} from "@apollo/client";

function SignOut() {
    const { authService } = useAuth();
    const { t } = useTranslation();
    const { navigate } = useNavigate();
    const gqlClient = useApolloClient();

    useEffect(() => {
        authService.logout(true)
            .then(value => {
                console.log('Log out successful');
                setTimeout(() => {
                    navigate('/');
                }, 10000);

            },value => {
                console.log('Log out failed');
                setTimeout(() => {
                    navigate('/');
                }, 10000);
            });

        gqlClient.clearStore()
            .then(() => console.log('Cache Cleared'))
            .catch(() => console.log('Error when attempting to clear cache'));
    });

    return (
        <div>Sign Out</div>
        // <CircularProgress />
       //<Loader active={true}/>
    );
}

export default SignOut;