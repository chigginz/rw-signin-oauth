import React from "react";
import background from "../../images/cloud_background.jpeg";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Link,
    Stack,
    Typography
} from "@mui/material";
import {REGISTER_NEW_USER} from "../../../qglMutators";
import {useMutation} from "@apollo/client";
import {useTranslation} from "react-i18next";
import {useNavigate, useSearchParams} from "react-router-dom";
import {cleanAuth, cleanSessionStorage} from "../../utility";

function RegistrationPage() {
    let [searchParams, setSearchParams] = useSearchParams();
    let firstNameParameter = ((searchParams.get("firstname") !== undefined && searchParams.get("firstname") !== null) ? searchParams.get("firstname") : "");
    let lastNameParameter =  ((searchParams.get("lastname") !== undefined && searchParams.get("lastname") !== null) ? searchParams.get("lastname") : "");
    let emailParameter =     ((searchParams.get("email") !== undefined && searchParams.get("email") !== null) ? searchParams.get("email") : "");

    console.log(firstNameParameter)
    console.log(lastNameParameter)
    console.log(emailParameter)


    const [submissionReady, setSubmissionReady] = React.useState(false);
    const [firstName, setFirstName] = React.useState(firstNameParameter);
    const [lastName, setLastName] = React.useState(lastNameParameter);
    const [email, setEmail] = React.useState(emailParameter);
    const [password, setPassword] = React.useState("");

    const enableFooterCallback = (isSubmissionReady, registrantFirstName, registrantLastName, registrantEmail, registrantPassword) => {
        if (isSubmissionReady !== submissionReady) {
            setSubmissionReady(isSubmissionReady);
            setFirstName(registrantFirstName);
            setLastName(registrantLastName);
            setEmail(registrantEmail);
            setPassword(registrantPassword);
        }
    }

    return (
        <div style={
            {
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'round',
                flexGrow: 1,
                minHeight: '93vh',
                minWidth: '90vw'
            }
        }>
            <Grid container direction="row">
                <Box component={Grid} item xs={0} sm={0} md={2} lg={3} xl={3}
                     display={{xs: "none", sm: "none", md: "block"}}/>
                <Box component={Grid} item xs={12} sm={12} md={8} lg={6} xl={6} display={{xs: "block"}}>
                    <div className="componentBorder">
                        <RegistrationFooter submissionReady={submissionReady}
                                            firstName={firstName}
                                            lastName={lastName}
                                            email={email}
                                            password={password} />
                    </div>
                </Box>
                <Box component={Grid} item xs={0} sm={0} md={2} lg={3} xl={3} display={{xs: "block"}}/>
            </Grid>
        </div>
    );
}


function RegistrationFooter(props) {
    const {submissionReady, firstName, lastName, email, password} = props;
    const { t } = useTranslation();
    let navigate = useNavigate();

    const [newUserRegistration, setNewUserRegistration] = React.useState(false);
    const [registrationSuccessful, setRegistrationSuccessful] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    let privacyDocumentUrl = process.env.REACT_APP_PRIVACY_DOCUMENT_PDF;
    let termsOfUseDocumentUrl = process.env.REACT_APP_TERMSOFUSE_DOCUMENT_PDF;

    const [createNewUser] = useMutation(REGISTER_NEW_USER, {
        variables: {
            "FirstName": firstName,
            "LastName": lastName,
            "EmailAddress": email,
            "Password": password
        }
    });

    const registerNewUserCallback = () => {
        createNewUser()
            .then((results) => {
                setRegistrationSuccessful(results.data.registerNewUser);
                setNewUserRegistration(true);
            })
            .catch((e) => {
                setErrorMessage(e.message);
                setRegistrationSuccessful(false);
                setNewUserRegistration(true);
            });
    }

    const handleCloseChangeResultModal = () => {
        if (registrationSuccessful) {
            navigate("/sign-in");
        } else {
            cleanSessionStorage();
            cleanAuth();
            window.location.replace(process.env.REACT_APP_WEBSITE_CONTEXT);
        }
    }

    return(
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}
               sx={{paddingTop: '30px'}}>
            <Typography>
                {t("You agree to Cambian Navigator's") + ' ' }
                <Link href={termsOfUseDocumentUrl} target="_blank">{t("Terms of use Agreement")}</Link>
                { ' ' + t("and") + ' ' }
                <Link href={privacyDocumentUrl} target="_blank">{t("Privacy Statement")}</Link>.
            </Typography>
            <Button disabled={!submissionReady}
                    variant="contained"
                    sx={{width: '170px'}}
                    onClick={() => registerNewUserCallback()}>
                {t("Agree & Create")}
            </Button>
            <Typography>{t("Have an Account?")}
                <Button variant="text" onClick={() => navigate("/sign-in")} sx={{pt:'0px',pr:'0px',pb:'0px',pl:'25px',fontSize: 16}}>
                    {t("Sign In")}
                </Button>
            </Typography>
            <Dialog open={newUserRegistration}
                    onClose={handleCloseChangeResultModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {registrationSuccessful ? "Registration Successful" : "Registration Unsuccessful"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            registrationSuccessful
                                ? t("New user has been registered.  Please login in with the new password.")
                                : errorMessage + ".   " + t("Please try again or contact support.")
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseChangeResultModal}>
                        {t("OK")}
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}

export default RegistrationPage;