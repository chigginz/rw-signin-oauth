import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SecuredApp from "./signin/SecuredApp";

ReactDOM.render(
    <React.StrictMode>
        <SecuredApp />
    </React.StrictMode>,
    document.getElementById('root')
);
