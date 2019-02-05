import { checkTeamParams } from '../../middleware/checks';
import { addTeamAction } from './team-controller';

export default [
  {
    path: "/api/v1/teams/add",
    method: "post",
    handler: [
      checkTeamParams,
      addTeamAction,
    ]
  },
];
