import {gql} from "@apollo/client";

export const CURRENT_CAMBIAN_USER_NEWSFEED = gql`
    query  getNewsFeed($Offset:String!, $ItemsPerPage:String!, $SortBy:String!, $OrderBy:String!) {
        getNewsFeed(offset:$Offset, itemsPerPage:$ItemsPerPage, sortBy:$SortBy, orderBy:$OrderBy) {
            organizationName
            creationDate
            logo
            imageSrc
            videoSrc
            text
            __typename
        }
    }     
`;


export const GET_CURRENT_USER_IDENTITY = gql`
    query  {
        getCurrentUserIdentity {
            id,
            firstName,
            lastName,
            __typename
        }
    }
`;




export const CURRENT_CAMBIAN_USER = gql`
    query  {
        currentCambianUser {
            firstName,
            lastName,
            email,
            gender,
            birthDate,
            photoImageUrl,
            photoImage,
            userReference {
                globalId
            },
            patientReference {
                idValue
            }
            __typename
        }
    }
`;

export const CURRENT_CAMBIAN_USER_FULL_DETAILS = gql`
    query  {
        currentCambianUser {
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
            __typename
        }
    }`;

export const GET_NETWORK_FOR_CAMBIAN_USER = gql`
    query getNetwork($CambianUserId: String!, $PatientId: String, $StatusSet: String) {
        getNetwork(cambianUserId: $CambianUserId, patientId: $PatientId, statusSet: $StatusSet) {
            id
            organizationId
            organizationUserId
            status
            name
            tagLine
            logoImageUrl
            imageForAd 
            articleForAd
            description
            address
            contactPhone
            contactFax
            contactEmail
            useOnlineConsent
            connectionRequest {
                taskId
                message
                state
                requestMessageId
            }
            answerQuestionnaireRequest {
                taskId
                message
                questionnaireId
                questionnaireResponseId
                state
            }
            __typename
        }
    }
`;

export const GET_NETWORK_REQUESTS_FOR_CAMBIAN_USER = gql`
    query getNetwork($CambianUserId: String!, $PatientId: String, $StatusSet: String) {
        getNetwork(cambianUserId: $CambianUserId, patientId: $PatientId, statusSet: $StatusSet) {
            id
            connectionRequest {
                taskId
            }
            answerQuestionnaireRequest {
                taskId
            }
            __typename
        }
    }
`;

export const GET_ORGANIZATION_DETAILS = gql`
    query getOrganizationDetail($OrganizationId: String!) {
        getOrganizationDetail(organizationId: $OrganizationId) {
            id
            organizationId
            name
            tagLine
            logoImageUrl
            imageForAd
            articleForAd
            description
            address
            contactPhone
            contactFax
            contactEmail
            useOnlineConsent
            __typename
        }
    }
`;

export const GET_ORGANIZATION_DETAILS_AS_SUMMARY = gql`
    query getOrganizationDetail($OrganizationId: String!) {
        getOrganizationDetail(organizationId: $OrganizationId) {
            organizationId
            organizationType
            name
            tagLine
            __typename
        }
    }
`;

export const GET_ORGANIZATION_LOGO = gql`
    query getOrganizationDetail($OrganizationId: String!) {
        getOrganizationDetail(organizationId: $OrganizationId) {
            organizationId
            logoImageUrl
            __typename
        }
    }
`;

export const GET_ARTICLE = gql`
    query getArticle($ArticleId: String!) {
        getArticle(articleId: $ArticleId) {
            body
            __typename
        }
    }
`;

export const GET_ARTICLE_ORGANIZATION = gql`
    query getArticle($ArticleId: String!, $RetrieveLogo: Boolean) {
        getArticle(articleId: $ArticleId, retrieveLogo: $RetrieveLogo) {
            organizationId
            organizationLogoUrl
            __typename
        }
    }
`;

export const GET_QUESTIONNAIRE_SUMMARIES = gql`
    query getQuestionnaireSummaries($OrganizationId: String!) {
        getQuestionnaireSummaries(organizationId: $OrganizationId) {
            name
            description
            questionnaireReference {
                idValue
            }
            __typename
        }
    }
`;

export const GET_ARTICLE_SUMMARY_BY_ORGANIZATION = gql`
    query getArticleSummariesByOrganizationIds($OrganizationId: String!) {
        getArticleSummariesByOrganizationIds(organizationId: $OrganizationId) {
            title
            summary
            shortName
            thumbnail
            articleReference {
                idValue
                globalId
            }
            __typename
        }
    }
`;

export const GET_QUESTIONNAIRE_RESPONSE_SUMMARIES = gql`
    query getQuestionnaireResponseSummaries($CambianUserId: String!, $PatientId: String!) {
        getQuestionnaireResponseSummaries(cambianUserId: $CambianUserId, patientId: $PatientId) {
            questionnaireId
            questionnaireResponseId
            name
            description
            state
            message
            createDateTime
            targetDateTime
            lastModifiedDateTime
            initiatingOrganizationId
            initiatingOrganizationName
            summaryScores {
                scoreDefinitionName
                score
            }
            task {
                taskType
                taskId
            }
            __typename
        }
    }
`;


export const GET_AVAILABLE_QUESTIONNAIRES = gql`
    query searchQuestionnaires($SelfServeSupported: Boolean, $Organization: String, $Lang: String, $Country: String, $Variant: String) {
        searchQuestionnaires(selfServeSupported: $SelfServeSupported, organization: $Organization, lang: $Lang, country: $Country, variant: $Variant) {
            questionnaireId
            title
            shortName
            __typename
        }
    }
`;

export const GET_ADVERTISEMENTS = gql`
    query getAds($PatientId: String!, $OrganizationId: String) {
        getAds(patientId: $PatientId, organizationId: $OrganizationId) {
            organizationId
            title
            summary
            abstraction
            shortName
            thumbnail
            imageAd
            articleId
            articleUrl
            expiryDate
            state
            __typename
        }
    }
`;


export const GET_RANDOM_ADVERTISEMENT = gql`
    query getAd($PatientId: String!, $OrganizationId: String) {
        getAd(patientId: $PatientId, organizationId: $OrganizationId) {
            organizationId
            title
            summary
            abstraction
            shortName
            thumbnail
            imageAd
            articleId
            articleUrl
            expiryDate
            state
            __typename
        }
    }
`;

export const GET_ARTICLES = gql`
    query getArticles($PatientId: String!, $OrganizationId: String) {
        getArticles(patientId: $PatientId, organizationId: $OrganizationId) {
            organizationId
            title
            summary
            shortName
            thumbnail
            articleReference {
                objectType
                idValue
                globalId
                version
            }
            articleUrl
            __typename
        }
    }
`;


export const GET_BP_SUMMARY = gql`
    query getBloodPressureSummary($PatientId: String!, $StartDate: LocalDateTime!, $EndDate: LocalDateTime!, $DesiredView: String!) {
        getBloodPressureSummary(patientId: $PatientId, startDate: $StartDate, endDate: $EndDate, desiredView: $DesiredView) {
            systolic {
                x
                y
            }
            diastolic {
                x
                y
            }
            pulse {
                x
                y
            }
            systolicRange
            diastolicRange
            pulseRange
            averagedSystolic
            averagedDiastolic
            averagedPulse
            targetSystolic
            targetDiastolic
            bpDataPoints {
                objectId {
                    objectType
                    idValue
                    globalId
                    version    
                }
                systolic 
                diastolic
                heartRate
                unit
                utcCollectedDateTime
                localCollectedDateTime
                localTimeZone
                bloodPressureMeasurementSetId
                patientId
                note
                dataSource
                numEveningReadings
                numMorningReadings
            }
        }
    }
`;

export const GET_QUESTIONNAIRE_RESPONSE_SHARE_DETAIL = gql`
    query getQuestionnaireResponseShareDetail($CambianUserId: String!,
                                              $PatientId: String!,
                                              $QuestionnaireResponseId: String!) {
        getQuestionnaireResponseShareDetail(cambianUserId: $CambianUserId,
                                            patientId: $PatientId,
                                            questionnaireResponseId: $QuestionnaireResponseId) {
            questionnaireResponseId
            organizationId
            isShared
            sharedDate
            __typename
        }
    }
`;