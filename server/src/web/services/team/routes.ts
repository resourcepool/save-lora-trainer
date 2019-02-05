import {checkClientIdPathVariable, checkTeamParams} from '../../middleware/checks';
import {addTeamAction, getTeamProgressAction} from './team-controller';

export default [
  {
    path: "/api/v1/teams/add",
    method: "post",
    handler: [
      checkTeamParams,
      addTeamAction,
    ]
  },
  {
    path: "/api/v1/teams/client/:clientId/progress",
    method: "get",
    handler: [
      checkClientIdPathVariable,
      getTeamProgressAction,
    ]
  },
];
