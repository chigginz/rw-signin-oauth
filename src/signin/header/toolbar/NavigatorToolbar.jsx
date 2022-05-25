import React, {useEffect, useState} from "react";
import {useAuth} from "../../security";
import Box from "@mui/material/Box";
import {
    AppBar, Button,
    ClickAwayListener,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Toolbar
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {CambianBranding} from "../CambianBranding";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import ErrorBoundary from "../../../ErrorBoundary";
import CitizenUser from "../CitizenUser";
import MenuIcon from "@mui/icons-material/Menu";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import {getExactSelectedView, getSelectedView, setSelectedView} from "../../utility";
import {useApolloClient} from "@apollo/client";


const useStyles = makeStyles(theme => ({
    appbar: {
//        backgroundColor: 'white',
//        color: '#428bca'
    },
    appbarBranding: {
        height: '73px',
        flex: 1,
        flexGrow: 1,
        paddingTop: '15px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'right',
        justifyContent: 'center'
    },
    appbarMenu: {
        height: '60px',
        margin: 'auto',
        justifyContent: 'center'
    },
    appbarAccount: {
        height: '60px',
        margin: 'auto',
        alignItems: 'left',
        justifyContent: 'left'
    },
    appbarHamburger: {
        height: '60px',
        margin: 'auto',
        alignItems: 'left',
        justifyContent: 'left',
        paddingTop: '15px'
    },
    iconButtonLabel: {
        fontSize: "16px",
        display: "block"
    },
    menuGroup : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        flex: 1
    },
    menuOption : {
        paddingLeft: "30px"
    }
}));


function NavigatorToolbar() {
    const {authService} = useAuth();
    if (authService.isAuthenticated() === false) {
        if (authService.isPending()) {
            return (
                <div>Navigator toolbar</div>
                // <CircularProgress />
                //<Loader active={true}/>
            );
        } else {
            return (
                <PublicDesktopToolbar/>
            );
        }
    }

    return (
        <ProtectedToolbar/>
    )
}


function PublicActions() {
    const { t } = useTranslation();
    let navigate = useNavigate();
    const classes = useStyles();
    let signInUrl = "/sign-in?preAuthUri=" + window.location.href;
    return (
        <div className={classes.menuGroup}>
            <Button onClick={() => navigate('/register')}>{t("Register")}</Button>
            <Button onClick={() => navigate(signInUrl)}>{t("Sign in")}</Button>
        </div>
    );
}

function PublicDesktopToolbar() {
    const classes = useStyles();
    const { authService } = useAuth();
    const [show, setShow] = useState(false);
    const publicActions = PublicActions();

    useEffect(() => {
        setShow(!authService.isAuthenticated());
    }, [authService]);
    return (

        <AppBar position="sticky"
                color="default">
            <Toolbar className={classes.appbar}>
                <div className={classes.appbarBranding}>
                    <CambianBranding />
                </div>
                {show && publicActions}
            </Toolbar>
        </AppBar>
    );
}


function ProtectedToolbar(props) {
    const {selectedViewCallback} = props;
    const classes = useStyles();

    return (
        <AppBar position="sticky"
                color="default">
            <Toolbar className={classes.appbar}>
                <Grid container direction="row">
                    <Box component={Grid} item xs={5} sm={4} md={4} lg={4} xl={4} display={{xs: "block"}}>
                        <div className={classes.appbarBranding}>
                            <CambianBranding />
                        </div>
                    </Box>

                    <Box component={Grid} item md={6} lg={5} xl={5} display={{xs: "none", sm: "none", md: "block"}}>
                        <DesktopMenuBar selectedViewCallback={selectedViewCallback}/>
                    </Box>

                    <Box component={Grid} item md={2} lg={3} xl={3} display={{xs: "none", sm: "none", md: "block"}}>
                        <DesktopAccountMenu/>
                    </Box>

                    <Box component={Grid} item xs={5} sm={6} md={3} lg={4} xl={5}
                         display={{xs: "block", sm: "block", md: "none"}}/>

                    <Box component={Grid} item xs={2} sm={2} md={3} lg={4} xl={5}
                         display={{xs: "block", sm: "block", md: "none"}}>
                        <MobileHamburgerMenu/>
                    </Box>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}



function DesktopMenuBar(props) {
    const {selectedViewCallback} = props;
    let navigate = useNavigate();
    const [anchorHealthDataEl, setAnchorHealthDataEl] = React.useState(null);
    const {t} = useTranslation();
    const classes = useStyles();

    // const handleMenuSelectionNavigation = (pageURL) => {
    //     navigate(pageURL);
    // };

    const handleMenuSelectionNavigation = (selectedView) => {
        selectedViewCallback(selectedView);
        navigate('/');
    };
    const handleHealthDataClickAway = () => {
        setAnchorHealthDataEl(null);
    }
    const handleCloseHealthDataMenu = () => {
        console.log('handleCloseHealthDataMenu');
    };
    const handleHealthDataMenuSelected = (pageURL) => {
        setAnchorHealthDataEl(null);
        navigate(pageURL);
    };
    const handleHealthDataMenuList = event => {
        setSelectedView("HealthData");
        setAnchorHealthDataEl(event.currentTarget);
    };
    return (
        <div className={classes.appbarMenu}>

            <Menu id="menu-healthData"
                 anchorEl={anchorHealthDataEl}
                 anchorOrigin={{
                     vertical: 'top',
                      horizontal: 'right',
                  }} 
                  keepMounted 
                  transformOrigin={{ 
                      vertical: 'top', 
                      horizontal: 'right', 
                  }} 
                  open={Boolean(anchorHealthDataEl)} 
                  onClose={() => handleCloseHealthDataMenu}> 
                 
                <MenuItem 
                    onClick={() => handleHealthDataMenuSelected(t("/blood-pressure"))}>{t("Blood Pressure")} 
                </MenuItem> 
                {/* <MenuItem 
                    onClick={() => handleHealthDataMenuSelected(t("/cardiovascular"))}>{t("Cardiovascular")} 
                </MenuItem> 
                <MenuItem 
                    onClick={() => handleHealthDataMenuSelected(t("/medications"))}>{t("Medications")} 
                </MenuItem> 
                <MenuItem 
                    onClick={() => handleHealthDataMenuSelected(t("/symptoms"))}>{t("Symptoms")} 
                </MenuItem> 
                <MenuItem 
                    onClick={() => handleHealthDataMenuSelected(t("/allergies"))}>{t("Allergies")} 
                </MenuItem> 
                <MenuItem 
                    onClick={() => handleHealthDataMenuSelected(t("/answer-questionnaire"))}>{t("Answer Questionnaire (sample)")} 
                </MenuItem>  */}
            </Menu> 
        </div>
    );
}


function DesktopAccountMenu() {
    const classes = useStyles();
    const {t} = useTranslation();
    const {authService} = useAuth();
    let navigate = useNavigate();
    const gqlClient = useApolloClient();
    
    const [anchorAccountEl, setAnchorAccountEl] = React.useState(null);

    const handleAccountMenuList = event => {
        setAnchorAccountEl(event.currentTarget);
    };
    const handleCloseAccountMenu = () => {
        console.log('handleCloseAccountMenu');
    };
    const handleAccountMenuSelected = (pageURL) => {
        setAnchorAccountEl(null);
        setSelectedView("EditProfileOrPassword");
        navigate(pageURL, {replace: true});
    };
    const handleSignOut = () => {
        authService.logout(true)
            .then(() => {
                console.log('logout succeeded');
                navigate('/public');
            })
            .catch(() => {
                console.log('logout failed');
                navigate('/public');
            });

        gqlClient.clearStore()
            .then(() => console.log('Cache Cleared'))
            .catch(() => console.log('Error when attempting to clear cache'));
    }

    return (
        <div className={classes.appbarAccount}>


            <Menu id="menu-account"
                  anchorEl={anchorAccountEl}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  open={Boolean(anchorAccountEl)}
                  onClose={() => handleCloseAccountMenu}>
                <MenuItem
                    onClick={() => handleAccountMenuSelected(t("/edit-user-profile"))}>{t("Edit User Profile")}</MenuItem>
                <MenuItem
                    onClick={() => handleAccountMenuSelected(t("/change-password"))}>{t("Change Password")}</MenuItem>
                <MenuItem onClick={() => handleSignOut()}>{t("Sign Out")}</MenuItem>
            </Menu>

        </div>
    );
}


function MobileHamburgerMenu() {
    const classes = useStyles();
    let navigate = useNavigate();
    const {t} = useTranslation();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleHamburgerMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleHamburgerMenuItemClick = pageURL => {
        setAnchorEl(null);
        navigate(pageURL);
    };
    const menuItems = [
        {
            id: "homeAction",
            menuTitle: t("Home"),
            pageURL: "/"
        },
        {
            id: "networkAction",
            menuTitle: t("Network"),
            pageURL: t("/network")
        },
        {
            id: "questionnairesAction",
            menuTitle: t("Questionnaires"),
            pageURL: t("/questionnaires")
        },
        // {
        //     id: "bloodPressureAction",
        //     menuTitle: t("Blood Pressure"),
        //     pageURL: t("/blood-pressure")
        // },
        // {
        //     id: "cardiovascularAction",
        //     menuTitle: t("Cardiovascular"),
        //     pageURL: t("/cardiovascular")
        // },
        // {
        //     id: "medicationsAction",
        //     menuTitle: t("Medications"),
        //     pageURL: t("/medications")
        // },
        // {
        //     id: "symptomsAction",
        //     menuTitle: t("Symptoms"),
        //     pageURL: t("/symptoms")
        // },
        // {
        //     id: "allergiesAction",
        //     menuTitle: t("Allergies"),
        //     pageURL: t("/allergies")
        // },
        {
            id: "editUserProfileAction",
            menuTitle: t("Edit User Profile"),
            pageURL: t("/edit-user-profile")
        },
        {
            id: "changePasswordAction",
            menuTitle: t("Change Password"),
            pageURL: t("/change-password")
        },
        {
            id: "signOutAction",
            menuTitle: t("Sign Out"),
            pageURL: t("/sign-out")
        }
    ];

    return (
        <div className={classes.appbarHamburger}>
            <IconButton edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleHamburgerMenu}>
                <MenuIcon/>
            </IconButton>
            <Menu id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}>
                {menuItems.map(menuItem => {
                    const {id, menuTitle, pageURL} = menuItem;
                    return (
                        <MenuItem key={id} onClick={() => handleHamburgerMenuItemClick(pageURL)}>
                            {menuTitle}
                        </MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
}




export {PublicDesktopToolbar, ProtectedToolbar};