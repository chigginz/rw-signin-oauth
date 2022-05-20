import React from "react";
import background from "../images/cloud_background.jpeg";

function Splash() {
    console.log('Splash');
    return (
        <div style={
            {
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'round',
                height: '100%',
                width: '100%'
            }
        }>
        </div>
    );
}

export default Splash;