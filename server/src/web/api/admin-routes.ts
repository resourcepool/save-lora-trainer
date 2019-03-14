import {setDateAction} from "../services/dates/date-controller";
import {authAdminJwtHandler} from "../middleware/checks";
import {resetAction} from "../services/admin/admin-controller";

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
    path: "/api/admin/game/reset",
    method: "post",
    handler: [
      authAdminJwtHandler,
      resetAction,
    ]
  },
];
