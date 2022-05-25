import React, { useEffect, useState } from 'react';
import NavigatorUserSignin from "./NavigatorUserSignin";
import {AuthProvider, AuthService, useAuth} from "./security";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache, useQuery} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {onError} from "@apollo/client/link/error";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {ThemeProvider} from "@mui/material/styles";
import PublicRoute from "./PublicRoute";
import RegistrationPage from "./pages/register/RegistrationPage";
import {SignIn} from "./sign-in/SignIn";
import HelpPage from "./pages/help/HelpPage";
import SignOut from "./pages/SignOut";
import ProtectedRoute from "./ProtectedRoute";
import {CURRENT_CAMBIAN_USER} from "../gqlQueries";
import PublicPage from "./pages/PublicPage";
import Loader from "./Loader";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {cleanAuth, cleanSessionStorage, signOut} from "./utility";
import {useTranslation} from "react-i18next";
//import IdleTimer from 'react-idle-timer';
//import IdleTimer from './sign-in/IdleTimer';
//import TimeoutModal from 'TimeOutModal';
import Landing from './sign-in/Landing';

const authService = new AuthService({
    clientId:       process.env.REACT_APP_AUTHSERVER_CLIENTID,
    autoRefresh:    process.env.REACT_APP_AUTHSERVER_AUTOREFRESH,
    provider:       process.env.REACT_APP_AUTHSERVER_PROVIDER,
    logoutEndpoint: process.env.REACT_APP_AUTHSERVER_LOGOUT_URL,
    redirectUri:    process.env.REACT_APP_WEBSITE_ROOT,
    scopes:         [
        process.env.REACT_APP_AUTHSERVER_SCOPES
        ]
});

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_URL
});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const authStructure = JSON.parse(localStorage.getItem('auth'));

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: authStructure ? `Bearer ${authStructure.access_token}` : "",
        }
    }
});



// Here is an example json theme:
//   https://gist.githubusercontent.com/phusick/b5a114b9fd4baeca339b12160139635d/raw/c93c0b71bab55bf2bde09c3a2052718faa445bdc/material-ui-theme.json

function WrappedSecuredApp() {
    const { t } = useTranslation();
    const [encounteredError, setEncounteredError] = React.useState(false);
    const [errorTitle, setErrorTitle] = React.useState("");
    const [errorContent, setErrorContent] = React.useState("");
    const [errorDialogCallback, setErrorDialogCallback] = React.useState();
    const [errorSignoutNeeded, setErrorSignoutNeeded] = React.useState();

    // console.log('process.env.NODE_ENV              : ' + process.env.NODE_ENV );
    // console.log('process.env.REACT_APP_WEBSITE_ROOT: ' + process.env.REACT_APP_WEBSITE_ROOT);
    // console.log('process.env.PUBLIC_URL: ' + process.env.PUBLIC_URL);
    //
    // console.log('process.env.REACT_APP_AUTHSERVER_CLIENTID: ' + process.env.REACT_APP_AUTHSERVER_CLIENTID);
    // console.log('process.env.REACT_APP_AUTHSERVER_AUTOREFRESH: ' + process.env.REACT_APP_AUTHSERVER_AUTOREFRESH);
    // console.log('process.env.REACT_APP_AUTHSERVER_PROVIDER: ' + process.env.REACT_APP_AUTHSERVER_PROVIDER);
    // console.log('process.env.REACT_APP_AUTHSERVER_LOGOUT_URL: ' + process.env.REACT_APP_AUTHSERVER_LOGOUT_URL);
    // console.log('process.env.REACT_APP_WEBSITE_ROOT: ' + process.env.REACT_APP_WEBSITE_ROOT);
    // console.log('process.env.REACT_APP_AUTHSERVER_SCOPES: ' + process.env.REACT_APP_AUTHSERVER_SCOPES);

    const signOut = () => {
        authService.logout(true)
            .then(() => window.location.replace(process.env.REACT_APP_WEBSITE_CONTEXT));
    }

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        let errorDialogTitle;
        let errorDialogContent;
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path, extensions }) => {
                if (extensions === undefined ||extensions.HttpStatus === undefined) {
                    console.log(`[GraphQL error at ${path}]: Message: ${message}, Extensions: ${extensions}`);
                    errorDialogTitle = t('Application Error');
                    errorDialogContent = t('An unexpected error occurred at ') + path + t(' - please contact technical support.  ') + message;

                } else {
                    let httpStatus = extensions.HttpStatus;
                    errorDialogTitle = extensions.errorType;
                    errorDialogContent = t('HttpStatus ') + httpStatus + t(': Error at ') + path;
                    console.log(`[GraphQL error at ${path}]: HttpStatus: ${httpStatus} Message: ${message}`);
                    if (httpStatus === 401 || httpStatus === 403) {
                        setErrorSignoutNeeded(true);
                    }
                }
            });

        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
            errorDialogTitle = t('Network Error');
            errorDialogContent = t('Back end services are unavailable at this time.  Please contact technical support');
        }

        setErrorTitle(errorDialogTitle);
        setErrorContent(errorDialogContent);
        setEncounteredError(true);
    });

    const gqlClient = new ApolloClient({
        link: from([errorLink, authLink, httpLink]),
        cache: new InMemoryCache()
    });

    const closeErrorDialog = () => {
        if (errorSignoutNeeded) {
            signOut();
        }
        setEncounteredError(false);
    }

    return (
        <AuthProvider authService={authService}>
            <ApolloProvider client={gqlClient}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <ThemeProvider>

                        <BrowserRouter basename={process.env.REACT_APP_WEBSITE_CONTEXT}>  {/* // Will be '/signin'  */}
                            <Routes>
                                <Route exact path='/public' element={<PublicRoute><PublicPage/></PublicRoute>}/>
                                <Route exact path='/register' element={<PublicRoute><RegistrationPage/></PublicRoute>}/>
                                <Route exact path='/sign-in' element={<PublicRoute><SignIn/></PublicRoute>}/>
                                <Route exact path='/sign-out' element={<PublicRoute><SignOut/></PublicRoute>}/>

                                {/* These are routes that require an unauthenticated user */}
                                {/**/}
                                <Route exact path='/help' element={<HelpPage/>}/>
                                <Route path="*" element={<ProtectedRoute><SecuredApp/></ProtectedRoute>}/>
                            </Routes>
                        </BrowserRouter>

                    </ThemeProvider>
                </LocalizationProvider>
            </ApolloProvider>

            <Dialog open={encounteredError}
                    onClose={() => closeErrorDialog()}>
                <DialogTitle id="error-message-title">
                    { errorTitle }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="error-message-description">
                        { errorContent }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeErrorDialog()}>
                        {"OK"}
                    </Button>
                </DialogActions>
            </Dialog>

        </AuthProvider>
    );
}



function SecuredApp() {
    const { authService } = useAuth();
    console.log('Secured App')

    let currentUser = authService.getCurrentUser();
    if (currentUser === undefined || currentUser === null || Object.keys(currentUser).length === 0) {
        return(
            <Landing />
        );
    }

    return(
        <NavigatorUserSignin />
    );
}

function TestLanding() {
    const authStructure = JSON.parse(localStorage.getItem('auth'));
    console.log("everything in the authStructure: ", authStructure);


    const signOut = () => {
        console.log("logging out");
        //window.localStorage.removeItem('auth');
        //window.location.href='http://silverfir:8787/realms/MisDev2/protocol/openid-connect/logout';
        authService.logout(true)
            .then(() => window.location.replace(process.env.REACT_APP_WEBSITE_CONTEXT));
    }


    const handleLogout = () => {
        window.location.href='http://192.168.10.201:8787/realms/MisDev/protocol/openid-connect/logout';
      }



  /*  const [isTimeout, setIsTimeout] = useState(false);
  useEffect(() => {
    const timer = new IdleTimer({
      timeout: 10, //expire after 10 seconds
      onTimeout: () => {
        setIsTimeout(true);
      },
      onExpired: () => {
        // do something if expired on load
        setIsTimeout(true);
      }
    });

    return () => {
      timer.cleanUp();
    };
  }, []);*/

  /*
   {!isTimeout &&
            <div>Active</div>
            }
            {isTimeout &&
            <div>NOT Active</div>
            }
            */
    // return the headers to the context so httpLink can read them
    return(
        <div>
            <h1>Hello World 123</h1>
            <p>Access token: {authStructure.access_token}</p>
            <p>Refresh token: {authStructure.refresh_token}</p>
            <button onClick={signOut}>
                Sign out
            </button>
 

 
            
        </div>
    )
}

function NavigatorInitialization() {
    const { loading, error, data } = useQuery(CURRENT_CAMBIAN_USER);
    const { authService } = useAuth();

    const handleClose = () => {
        cleanSessionStorage();
        cleanAuth();
        window.location.replace(process.env.REACT_APP_WEBSITE_CONTEXT);
    }

    if (loading) {
        console.log("NavigatorInitialization....waiting")
        return (
            <Loader active={true}/>
        );

    } else if (error) {
        return(
            <div>
                <Dialog open={true}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        Unable to Start Application
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Services needed to run application are offline.  Please contact technical support.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>)

    } else {
        console.log("NavigatorInitialization....got user")
        authService.setCurrentUser(data.currentCambianUser);
        return(<NavigatorUserSignin />);
    }
}


export default WrappedSecuredApp;

