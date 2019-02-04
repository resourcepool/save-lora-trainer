import { checkIdParams, checkPassword, checkTeamParams } from '../../middleware/checks';
import { addTeamAction, deleteTeamAction, editTeamAction } from './TeamController';

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
    path: "/api/v1/teams/edit",
    method: "patch",
    handler: [
      checkTeamParams,
      checkIdParams,
      checkPassword,
      editTeamAction,
    ]
  },
  {
    path: "/api/v1/teams/delete",
    method: "delete",
    handler: [
      checkIdParams,
      checkPassword,
      deleteTeamAction,
    ]
  }
];
