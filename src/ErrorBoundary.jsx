import React from "react";
import ErrorIcon from '@mui/icons-material/Error';
import { red } from '@mui/material/colors';
import {IconButton} from "@mui/material";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { isError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
        console.log(error.name + ":" + error.message);
    }

    render() {
        if (this.state.isError) {
            return(
                <IconButton>
                    <ErrorIcon fontSize="large" sx={{ color: red[500] }}/>
                </IconButton>
             );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;