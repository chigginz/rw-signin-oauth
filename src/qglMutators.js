import {gql} from "@apollo/client";


export const REGISTER_NEW_USER = gql`
    mutation changePassword($FirstName: String!,
        $LastName: String!,
        $EmailAddress: String!,
        $Password: String!) {
        registerNewUser(firstName: $FirstName,
            lastName: $LastName,
            emailAddress: $EmailAddress,
            password: $Password) {
            username,
            email,
            firstName,
            lastName
        }
    } 
`;


export const CHANGE_PASSWORD = gql`
    mutation changePassword($CurrentPassword: String, $NewPassword: String) {
        changePassword(currentPassword: $CurrentPassword, newPassword: $NewPassword)
    }
`;

export const CHANGE_USER_PROFILE = gql`
    mutation updateCurrentCambianUser($editCambianUser: EditCambianUser) {
        updateCurrentCambianUser(editCambianUser: $editCambianUser)  {
            username
            userReference {
                globalId
            }
            patientReference {
                idValue
            }
            email
            phone
            firstName
            lastName 
            photoImageUrl
            photoImage
            birthMonth
            birthDay
            birthYear
            gender
            healthcareIdType
            healthcareIdValue
            address1
            address2
            city
            province
            country
            postalCode
            subscribeToEmails
            userIdentity {
                type
                value
                primary
            }
        }
    }
`;



export const IGNORE_CONNECTION_REQUEST = gql`
    mutation ignoreConnectionRequest($TaskId: String!) {
        ignoreConnectionRequest(taskId: $TaskId)
    }
`;


export const ACCEPT_CONNECTION_REQUEST = gql`
    mutation acceptConnectionRequest($CambianUserId: String!, $TargetUserId: String!, $RequestMessageId: String!, $OrgId: String!) {
        acceptConnectionRequest(cambianUserId: $CambianUserId, targetUserId:$TargetUserId, requestMessageId: $RequestMessageId, orgId: $OrgId)
    }
`;


export const START_ASSIGNED_QUESTIONNAIRE_REQUEST = gql`
    mutation startQuestionnaire($OrganizationId: String!, $QuestionnaireId: String!, $TaskId: String!) {
        startQuestionnaire(organizationId: $OrganizationId, questionnaireId: $QuestionnaireId, taskId: $TaskId)
    }
`;


export const START_QUESTIONNAIRE_SURVEY_REQUEST = gql`
    mutation startQuestionnaire($OrganizationId: String!, $QuestionnaireId: String!) {
        startQuestionnaire(organizationId: $OrganizationId, questionnaireId: $QuestionnaireId)
    }
`;


export const IGNORE_QUESTIONNAIRE_REQUEST = gql`
    mutation ignoreAssignedQuestionnaire($TaskId: String!) {
        ignoreAssignedQuestionnaire(taskId: $TaskId)
    }
`;

export const ADD_BP_DATA_POINT = gql`
    mutation createBloodPressureDataPoint($bloodPressureDataPoint: EditBloodPressureDataPoint) {
        createBloodPressureDataPoint(bloodPressureDataPoint: $bloodPressureDataPoint)
    }
`;


export const HIDE_QUESTIONNAIRE_RESPONSE = gql`
    mutation hideQuestionnaireResponse($QuestionnaireResponseId: String!) {
        hideQuestionnaireResponse(questionnaireResponseId: $QuestionnaireResponseId)
    }
`;


export const SHARE_QUESTIONNAIRE_RESPONSE = gql`
    mutation shareQuestionnaireResponse($QuestionnaireResponseId: String!, $GrantAccessToOrgType: String!, $GrantAccessToOrgId: String!) {
        shareQuestionnaireResponse(questionnaireResponseId: $QuestionnaireResponseId, grantAccessToOrgType: $GrantAccessToOrgType, grantAccessToOrgId: $GrantAccessToOrgId)
    }
`;
export const EDIT_BP_DATA_POINT = gql`
    mutation updateBloodPressureDataPoint($bloodPressureDataPoint: EditBloodPressureDataPoint) {
        updateBloodPressureDataPoint(bloodPressureDataPoint: $bloodPressureDataPoint)
    }
`;

export const DELETE_BP_DATA_POINT = gql`
    mutation deleteBloodPressureDataPoint($id: String!) {
        deleteBloodPressureDataPoint(id: $id)
    }
`;

export const SET_BP_TARGET = gql`
    mutation setBloodPressureTarget($patientId: String!, $systolic: Int, $diastolic: Int) {
        setBloodPressureTarget(patientId: $patientId, systolic: $systolic, diastolic: $diastolic) {
            systolic
            diastolic
        }
    }
`;

