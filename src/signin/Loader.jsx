import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Loader(props) {
    const {active} = props;
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={active}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loader;