import {AppBar, Box, Divider, Link, Stack, Toolbar, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import React from "react";


function PublicFooter(props) {
    const {fontSize} = props;
    const { t } = useTranslation();
    let applicationName = process.env.REACT_APP_NAME;
    let applicationVersion = process.env.REACT_APP_VERSION;
    let privacyDocument = process.env.REACT_APP_PRIVACY_DOCUMENT_PDF;

    return (
        <AppBar position="fixed"
                color="default"
                sx={{
                       top: 'auto',
                       bottom: 0
                }}>
            <Toolbar>
                <Typography variant='caption text' sx={{fontSize: fontSize}}>{t("Copyright © Cambian Business Services, Inc.")}</Typography>
                <Box sx={{flexGrow: 1}}/>
                <Stack direction="row"
                       divider={<Divider orientation="vertical" flexItem/>}
                       spacing={2}>
                    <Link href="mailto:support@cambian.com" sx={{fontSize: fontSize}}>{t("Help")}</Link>
                </Stack>
                <Box sx={{flexGrow: 1}}/>
                <Typography variant='caption text' sx={{fontSize: fontSize}}>{applicationName} {applicationVersion}</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default PublicFooter;