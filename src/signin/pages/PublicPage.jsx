import React from "react";
import {PublicDesktopToolbar} from "../header/toolbar/NavigatorToolbar";
import {Paper} from "@mui/material";
import PublicFooter from "../footer/PublicFooter";
import background from '../images/cloud_background.jpeg';

function PublicPage() {
    return (
        <div id="mainContainer">

            <PublicDesktopToolbar/>

            <Paper style={{
                position: 'fixed',
                top: '76px',
                bottom: '61px',
                left: '1px',
                right: '1px',
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'round',
                flexGrow: 1
            }} />

            <PublicFooter fontSize={12}/>
        </div>

    );
}

export default PublicPage;