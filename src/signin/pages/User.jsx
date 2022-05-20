import {useNavigate, useSearchParams} from "react-router-dom";
import {CambianBranding} from "../header/CambianBranding";
import CitizenUser from "../header/CitizenUser";
import {useAuth} from "../security";
import {Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";


function User(props) {
    let [searchParams, setSearchParams] = useSearchParams();
console.log("Zoodle: " + searchParams.get("zoodle"));
    let navigate = useNavigate();
    const { authService } = useAuth();
    let currentUser = authService.getCurrentUser();

    return (
        <div>
            <Box sx={{ width: '100%', m:'10px' }} >
                <Stack spacing={2} direction="row">
                    <CambianBranding />
                    <CitizenUser />
                </Stack>
            </Box>
            
            <Typography sx={{mt: '30px'}}>First Name: {currentUser.firstName}</Typography>
            <Typography>Last Name : {currentUser.lastName}</Typography>
            <Typography>Email     : {currentUser.email}</Typography>
        </div>
    );
}


export default User;