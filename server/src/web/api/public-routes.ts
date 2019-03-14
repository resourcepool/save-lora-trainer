import {
    authPublicJwtHandler,
    checkClientIdPathVariable,
    checkNumberIdPathVariable,
    checkTeamParams
} from '../middleware/checks';
import {
    getJoinRequestDecodeChallenge,
    getJoinRequestSupportedChallenge,
    submitJoinRequestDecodeChallenge,
    submitJoinRequestSupportedChallenge
} from '../services/challenges/challenge-controller';
import {authenticate} from "../services/admin/admin-controller";
import {getDateAction} from "../services/dates/date-controller";
import {
    addTeamAction,
    getAllTeamProgressAction,
    getTeamAction,
    getTeamProgressAction,
    getTeamPrototypeAction
} from "../services/team/team-controller";

export default [
    {
        path: "/api/public/authenticate",
        method: "post",
        handler: [
            authPublicJwtHandler,
            authenticate,
        ]
    },
    {
        path: "/api/public/date",
        method: "get",
        handler: [
            authPublicJwtHandler,
            getDateAction,
        ]
    },
    {
        path: "/api/public/challenges/joinrequestsupported/client/:clientId",
        method: "get",
        handler: [
            authPublicJwtHandler,
            checkClientIdPathVariable,
            getJoinRequestSupportedChallenge,
        ]
    },
    {
        path: "/api/public/challenges/joinrequestsupported/:id",
        method: "post",
        handler: [
            authPublicJwtHandler,
            checkNumberIdPathVariable,
            submitJoinRequestSupportedChallenge,
        ]
    },
    {
        path: "/api/public/challenges/joinrequestdecode/client/:clientId",
        method: "get",
        handler: [
            authPublicJwtHandler,
            checkClientIdPathVariable,
            getJoinRequestDecodeChallenge,
        ]
    },
    {
        path: "/api/public/challenges/joinrequestdecode/:id",
        method: "post",
        handler: [
            authPublicJwtHandler,
            checkNumberIdPathVariable,
            submitJoinRequestDecodeChallenge,
        ]
    },
    {
        path: "/api/public/teams/client/:clientId",
        method: "get",
        handler: [
            authPublicJwtHandler,
            checkClientIdPathVariable,
            getTeamAction,
        ]
    },
    {
        path: "/api/public/teams/add",
        method: "post",
        handler: [
            authPublicJwtHandler,
            checkTeamParams,
            addTeamAction,
        ]
    },
    {
        path: "/api/public/teams/client/:clientId/progress",
        method: "get",
        handler: [
            authPublicJwtHandler,
            checkClientIdPathVariable,
            getTeamProgressAction,
        ]
    },
    {
        path: "/api/public/teams/prototype",
        method: "get",
        handler: [
            authPublicJwtHandler,
            getTeamPrototypeAction,
        ]
    },
    {
        path: "/api/public/teams/progress",
        method: "get",
        handler: [
            authPublicJwtHandler,
            getAllTeamProgressAction,
        ]
    },
];
