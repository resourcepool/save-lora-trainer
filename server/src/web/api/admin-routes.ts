import {setDateAction, resetDateAction} from "../services/dates/date-controller";
import {authAdminJwtHandler} from "../middleware/checks";
import {resetAction} from "../services/admin/admin-controller";
import { unlockChallengeAction } from '../services/team/team-controller';

export default [
  {
    path: "/api/admin/game/start",
    method: "post",
    handler: [
      authAdminJwtHandler,
      setDateAction,
    ]
  },
  {
    path: "/api/admin/game/date/reset",
    method: "post",
    handler: [
      authAdminJwtHandler,
      resetDateAction,
    ]
  },
  {
    path: "/api/admin/game/reset",
    method: "post",
    handler: [
      authAdminJwtHandler,
      resetAction,
    ]
  },
  {
    path: "/api/admin/teams/progress/unlock",
    method: "post",
    handler: [
      authAdminJwtHandler,
      unlockChallengeAction,
    ]
  },
];
