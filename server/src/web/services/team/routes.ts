import {checkClientIdPathVariable, checkTeamParams} from '../../middleware/checks';
import {addTeamAction, getTeamProgressAction, getAllTeamProgressAction, getTeamAction} from './team-controller';

export default [
  {
    path: "/api/public/teams/client/:clientId",
    method: "get",
    handler: [
      checkTeamParams,
      getTeamAction,
    ]
  },
  {
    path: "/api/public/teams/add",
    method: "post",
    handler: [
      checkTeamParams,
      addTeamAction,
    ]
  },
  {
    path: "/api/public/teams/client/:clientId/progress",
    method: "get",
    handler: [
      checkClientIdPathVariable,
      getTeamProgressAction,
    ]
  },
  {
    path: "/api/public/teams/progress",
    method: "get",
    handler: [
      getAllTeamProgressAction,
    ]
  },
];
