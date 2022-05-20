import {useAuth} from "./security";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import Loader from "./Loader";

// Please see https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5
function PublicRoute({ children }) {
    const [childComponent, setChildComponent] = React.useState(<Loader active={true} />);

    const { authService } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        if (authService.isAuthenticated()) {
            navigate('/');
        } else {
            setChildComponent(children)
        }
    });

    return childComponent;
}

export default PublicRoute;