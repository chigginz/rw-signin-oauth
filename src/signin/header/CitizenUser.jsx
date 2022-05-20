import React from "react";
import {Avatar, Tooltip} from "@mui/material";
import {useAuth} from "../security";
import {userInitials} from "../utility";

function CitizenUser() {
    const { authService } = useAuth();
    let currentUser = authService.getCurrentUser();

    const avatar = (currentUser) => {
        if (currentUser.photoImageUrl == null && currentUser.photoImage == null) {
            return(
                <Tooltip title={currentUser.email}>
                    <Avatar alt="{currentUser.firstName} {currentUser.lastName}">{userInitials(currentUser)}</Avatar>
                </Tooltip>
            );
        }

        return(
            <Tooltip title={currentUser.email}>
                <Avatar alt="{currentUser.firstName} {currentUser.lastName}"
                        src={currentUser.photoImage ? currentUser.photoImage : currentUser.photoImageUrl} />
            </Tooltip>
        );
    }

    return (
        <div>
            {/*style={{width:'500px'}}>*/}
            <div style={{paddingLeft:'15px'}}>
                {avatar(currentUser)}
            </div>
            <div>
                {currentUser.firstName} {currentUser.lastName}
            </div>
        </div>
    );
}

export default CitizenUser;