import {setSelectedView} from "../utility";

function CambianBranding() {
    return (
        <a href={process.env.REACT_APP_WEBSITE_CONTEXT} onClick={() => setSelectedView('HomeView')}>
            <img src={process.env.REACT_APP_WEBSITE_CONTEXT + "/Cambian_Navigator.png"} alt="Cambian branding for NavigatorUserSignin app" width="160" height="50"/>
        </a>
    );
}

export {CambianBranding};