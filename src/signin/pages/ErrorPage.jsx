import {Typography} from "@mui/material";

function ErrorPage(props) {
    const {content} = props;
    return(
        <div>
          <Typography variant="subtitle1">
              {content}
          </Typography>
        </div>
    );
}

export default ErrorPage;