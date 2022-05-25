import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Loader(props) {
    const {active} = props;
    return (
        <Backdrop sx={{ color: '#fff'}}
                  open={active}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loader;