import { createTheme } from "@mui/material/styles";

const globalTheme = createTheme({
    palette: {
        common: {
            white: '#FFFFFF',
            black: '#000000',
            cambianBlue: '#4D76A9',
            darkBlue: '#41638E',
            coconut: '#FDFDFD',
            lightGray: '#F0F0F0',
            mediumGray1: '#D9DAD9',
            mediumGray2: '#CBCBCB',
            darkGray1: '#595959',
            darkGray2: '#333333',
            cambianBackground: '#f5f8fa',
            skyBlue: '#47AAFF',
        },
    }
});

// Here is an example json theme:
//   https://gist.githubusercontent.com/phusick/b5a114b9fd4baeca339b12160139635d/raw/c93c0b71bab55bf2bde09c3a2052718faa445bdc/material-ui-theme.json

const CambianTheme = createTheme({
    typography: {
        button: {
            textTransform: "none"
        }
    },
    palette: {
        cambianCommon: globalTheme.palette.common,
        primary: {
            main: globalTheme.palette.common.cambianBlue,
            hover: globalTheme.palette.common.darkBlue
        },
        background: {
            default: globalTheme.palette.common.cambianBackground,
            secondary: globalTheme.palette.common.lightGray,
        },
        text: {
            primary: globalTheme.palette.common.darkGray2,
            secondary: globalTheme.palette.common.cambianBlue,
            subHeading: globalTheme.palette.common.skyBlue,
        },
    },
    components: {
        MuiTab: {
            styleOverrides: {
                root: ({ theme }) => ({
                    fontSize: '1rem',
                }),
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
                disableRipple: true, // No more ripple!
            },
            styleOverrides: {
                outlinedPrimary: {
                    backgroundColor: globalTheme.palette.common.white,
                }
            }
        },
        MuiAccordion: {
            styleOverrides: {
                root: ({ theme }) => ({
                    //border: '1px solid',
                    //borderColor: theme.palette.divider,
                }),
            },
        },
        MuiAccordionSummary:{
            styleOverrides: {
                root: ({ theme }) => ({
                    borderBottom: '1px solid',
                    borderColor: theme.palette.divider,
                }),
            },
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    color: globalTheme.palette.common.mediumGray2,
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                colorDefault: {
                    backgroundColor: globalTheme.palette.common.white,
                }
            }
        }
    },
});


export {CambianTheme};