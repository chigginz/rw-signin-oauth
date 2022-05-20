import AlertDialog from "./ErrorAlert";
import React from "react";




export function convertDateToLocaleString(dateValue) {
    const d = new Date(dateValue);
    const formattedDate = d.toLocaleDateString("en", { // you can use undefined as first argument
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
    const datePart = formattedDate.split('/');
    const reconstructedDate = datePart[2] + "-" + datePart[0] + "-" + datePart[1];

    const timePart = d.toLocaleTimeString();
    const splitTime = timePart.split(" ");
    const meridiem = splitTime[1].toLowerCase();
    const timeElements = splitTime[0].split(":");
    const reconstructedTime = timeElements[0] + ":" + timeElements[1] + " " + meridiem;

    const result = reconstructedDate + " " + reconstructedTime;

    return result;
}

export function extractDateFromLocaleString(dateValue) {
    let dateString = "";
    if (dateValue !== undefined && dateValue !== null) {
        const localeString = convertDateToLocaleString(dateValue);
        const datePart = localeString.split(" " );
        dateString = datePart[0];
    }
    return dateString;
}



export function errorMessageAction(graphqlError) {
    // let component;
    // let statusCode;
    // let message;
    // let errorType;
    // let executionId;
    // let path;
    // console.log(graphqlError);
    // graphqlError.forEach(err => {
    //     console.log(err);
    //     if (err.extensions !== undefined && err.extensions.HttpStatus !== undefined) {
    //         statusCode = err.extensions.HttpStatus;
    //         message = err.message;
    //         errorType = err.extensions.errorType;
    //         if (err.path !== null) {
    //             path = JSON.stringify(err.path);
    //         }
    //         if (err.extensions.debugInfo !== null) {
    //             executionId =  err.extensions.debugInfo.executionId;
    //         }
    //     }
    // });
    //
    // console.log(message);
    // console.log( errorType);
    // console.log( executionId);
    // console.log( path);
    //
    // if (statusCode === 401 || statusCode === 403) {
    //     component = <div>Utility</div>;// <CircularProgress />;//<Loader active={true}/>;
    //    // navigate('/sign-out');
    //     console.log("WOULD LIKE TO BE ABLE TO REDIRECT TO SIGN OUT HERE");
    //
    // } else {
    //     let title = "Application Error";
    //     let text = "An unexpected error occurred - please contact technical support.  " + message;
    //
    //     component = <AlertDialog title={title} text={text}/>;
    // }
    //
    // return component;
    return <></>
}


//
// sanitizeHtmlText
//
// This function changes the HTML that is retrieved for a news feed so that the URLs are compatible with the React
// navigator application when deployed to a static context such as Apache.
//
export function sanitizeHtmlText(htmlString) {
    let result = htmlString;
    let apiGatewayUrl=process.env.REACT_APP_GATEWAY_HOST;
    let context = process.env.REACT_APP_WEBSITE_CONTEXT;
    if (htmlString !== null && htmlString !== undefined) {

        // //
        // // Change URLs in the newsfeed from something like:
        // //     <a href="/article/3d97970a-2529-42e3-9183-462bb6b41d19"
        // // to
        // //     <a href="/navigator?articleId=3d97970a-2529-42e3-9183-462bb6b41d19"
        // //
        result = htmlString.replace(/<a href=\"\/article\//g, "<a href=\"" + context + "?articleId=");

        //
        // Change relative path image resources to a explicit URL on the api-gateway.  The reason that this
        // is necessary is that Bootstrap Navigator routed image calls through the Navigator Spring Boot which
        // under the covers would redirect to navigator-api-gateway.  This cannot be done in a React app that is
        // statically deployed into something like Apache.
        // Urls that look like this:
        //      <img class="" src="api/media/F-BIO-2-header-img.jpg" height="100%" width="100%">
        // are changed to Urls that look like this:
        //      <img class="" src="http://localhost:9000/images/api/media/F-BIO-2-header-img.jpg" height="100%" width="100%">
        //
        // Note the part shown above "http://localhost:9000" is pulled in from the environment variable
        //      REACT_APP_GATEWAY_HOST
        //
        // NOTE : This functionality has been moved to the ArticleDataFetcher class in the api-gateway
        //
        // result = result.replace(/\"api\/media\//g, "\"" + apiGatewayUrl +  "/images/api/media/");
    }
    return result;
}


export function cleanAuth(viewName) {
    window.localStorage.removeItem('pkce');
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('currentUser');
}


export function cleanSessionStorage(viewName) {
    if (viewName === 'HomeView') {
        clearSelectedOrganizationId();
        clearSelectedArticleId();
        clearSelectedQuestionnaireId();
        clearSelectedQuestionnaireResponseId();

    } else if (viewName === 'NetworkConnectionView') {
        clearSelectedArticleId();
        clearSelectedQuestionnaireId();
        clearSelectedQuestionnaireResponseId();

    } else if (viewName === 'OrganizationAboutView') {
        clearSelectedArticleId();
        clearSelectedQuestionnaireId();
        clearSelectedQuestionnaireResponseId();

    } else if (viewName === 'OrganizationResourceView') {
        clearSelectedArticleId();
        clearSelectedQuestionnaireId();
        clearSelectedQuestionnaireResponseId();

    } else if (viewName === 'ArticleView') {
        clearSelectedQuestionnaireId();
        clearSelectedQuestionnaireResponseId();

    } else if (viewName === 'QuestionnaireListView') {
        clearSelectedOrganizationId();
        clearSelectedArticleId();
        clearSelectedQuestionnaireId();
        clearSelectedQuestionnaireResponseId();

    } else if (viewName === 'ViewQuestionnaireResultsView') {
        clearSelectedOrganizationId();
        clearSelectedArticleId();

    } else if (viewName === 'ContinueQuestionnaireView') {
        clearSelectedArticleId();

    } else if (viewName === 'HealthData') {
        clearSelectedOrganizationId();
        clearSelectedArticleId();
        clearSelectedQuestionnaireId();
        clearSelectedQuestionnaireResponseId();

    } else if (viewName === 'EditProfileOrPassword') {
        clearSelectedOrganizationId();
        clearSelectedArticleId();
        clearSelectedQuestionnaireId();
        clearSelectedQuestionnaireResponseId();
    }
}

//
// Functions to store the selected view in session storage
//
export function getSelectedView() {
    let view = window.sessionStorage.getItem('selectedView');
    if (view === undefined || view === null) {
        view = 'HomeView';
    }
    cleanSessionStorage(view);
    return view;
}
export function getExactSelectedView() {
    return window.sessionStorage.getItem('selectedView');
}
export function setSelectedView(viewName) {
    window.sessionStorage.setItem('selectedView', viewName);
    cleanSessionStorage(viewName);

}
export function clearSelectedView() {
    window.sessionStorage.removeItem('selectedView')
}


//
// Functions to store the selected organization id in session storage
//
export function getSelectedOrganizationId() {
    return window.sessionStorage.getItem('selectedOrganizationId');
}
export function setSelectedOrganizationId(organizationId) {
    window.sessionStorage.setItem('selectedOrganizationId', organizationId);
}
export function clearSelectedOrganizationId() {
    window.sessionStorage.removeItem('selectedOrganizationId')
}


//
// Functions to store the selected article id in session storage
//
export function getSelectedArticleId() {
    return window.sessionStorage.getItem('selectedArticleId');
}
export function setSelectedArticleId(articleId) {
    window.sessionStorage.setItem('selectedArticleId', articleId);
}
export function clearSelectedArticleId() {
    window.sessionStorage.removeItem('selectedArticleId')
}



//
// Functions to store the selected questionnaire id in session storage
//
export function getSelectedQuestionnaireId() {
    return window.sessionStorage.getItem('selectedQuestionnaireId');
}
export function setSelectedQuestionnaireId(questionnaireId) {
    window.sessionStorage.setItem('selectedQuestionnaireId', questionnaireId);
}
export function clearSelectedQuestionnaireId() {
    window.sessionStorage.removeItem('selectedQuestionnaireId')
}



//
// Functions to store the selected questionnaire response id in session storage
//
export function getSelectedQuestionnaireResponseId() {
    return window.sessionStorage.getItem('selectedQuestionnaireResponseId');
}
export function setSelectedQuestionnaireResponseId(questionnaireResponseId) {
    window.sessionStorage.setItem('selectedQuestionnaireResponseId', questionnaireResponseId);
}
export function clearSelectedQuestionnaireResponseId() {
    window.sessionStorage.removeItem('selectedQuestionnaireResponseId')
}


export function clearStateVariables() {
    clearSelectedView();
    clearSelectedOrganizationId();
    clearSelectedArticleId();
    clearSelectedQuestionnaireId();
    clearSelectedQuestionnaireResponseId();
}



export function userInitials(currentUser) {
    let initials;
    if ((currentUser.firstName != null) && (currentUser.lastName != null)) {
        initials = currentUser.firstName.charAt(0).toUpperCase() +
            currentUser.lastName.charAt(0).toUpperCase();

    } else if ((currentUser.lastName != null)) {
        initials = currentUser.lastName.charAt(0).toUpperCase();

    } else if ((currentUser.firstName != null)) {
        initials = currentUser.firstName.charAt(0).toUpperCase();

    } else {
        initials = '?';
    }
    return initials;
}

