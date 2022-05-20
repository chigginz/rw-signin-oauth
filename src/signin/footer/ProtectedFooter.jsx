import {AppBar, Box, Divider, Link, Stack, Toolbar, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useMutation} from "@apollo/client";
import {START_ASSIGNED_QUESTIONNAIRE_REQUEST, START_QUESTIONNAIRE_SURVEY_REQUEST} from "../../qglMutators";
import React from "react";
import Loader from "../Loader";
import {clearSelectedQuestionnaireId, setSelectedQuestionnaireResponseId, setSelectedView} from "../utility";

const noPointer = {cursor: 'pointer'};

function PublicFooter(props) {
    const {selectedViewCallback, fontSize} = props;
    const { t } = useTranslation();
    const [startQuestionnaireRequestGraphQL] = useMutation(START_QUESTIONNAIRE_SURVEY_REQUEST);
    const [showIsBusy, setShowIsBusy] = React.useState(false);

    let applicationName = process.env.REACT_APP_NAME;
    let applicationVersion = process.env.REACT_APP_VERSION;
    let cambianOrganizationId = process.env.REACT_APP_CAMBIAN_ORGANIZATION_ID;
    let cambianSatisfactionId = process.env.REACT_APP_CAMBIAN_SATISFACTION_SURVEY;
    let privacyDocument = process.env.REACT_APP_PRIVACY_DOCUMENT_PDF;
    let termsOfUseDocument = process.env.REACT_APP_TERMSOFUSE_DOCUMENT_PDF;

    const answerSurveyQuestionnaire = () => {
        setShowIsBusy(true);
        startQuestionnaireRequestGraphQL({
            variables: {
                "OrganizationId": cambianOrganizationId,
                "QuestionnaireId": cambianSatisfactionId
            }
        }).then(result => {
            console.log(result);
            let questionnaireResponseId = result.data.startQuestionnaire;
            clearSelectedQuestionnaireId();
            setSelectedQuestionnaireResponseId(questionnaireResponseId);
            selectedViewCallback('ContinueQuestionnaireView');
            setShowIsBusy(false);
        }).catch(error => {
            console.log(error); // TODO - need to get a error dialog up
            setShowIsBusy(false);
        });
    }

    return (
        <>
           {/*// <Loader active={showIsBusy} />*/}
            <AppBar position="fixed"
                    color="default"
                    sx={{
                          top: 'auto',
                          bottom: 0
                    }}>
                <Toolbar>
                    <Typography variant='caption text' sx={{fontSize: fontSize}}>{t("Copyright © Cambian Business Services, Inc.")}</Typography>
                    <Box sx={{flexGrow: 1}}/>
                    <Stack direction="row"
                           divider={<Divider orientation="vertical" flexItem/>}
                           spacing={2}>
                        <Link sx={{fontSize: fontSize}} onClick={() => answerSurveyQuestionnaire()} style={noPointer}>{t("Feedback")}</Link>
                        <Link href="mailto:support@cambian.com" sx={{fontSize: fontSize}}>{t("Help")}</Link>
                        <Link href={privacyDocument} sx={{fontSize: fontSize}} target="_blank">{t("Privacy Policy")}</Link>
                        <Link href={termsOfUseDocument} sx={{fontSize: fontSize}} target="_blank">{t("Terms of Use")}</Link>

                    </Stack>
                    <Box sx={{flexGrow: 1}}/>
                    <Typography variant='caption text' sx={{fontSize: fontSize}}>{applicationName} {applicationVersion}</Typography>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default PublicFooter;