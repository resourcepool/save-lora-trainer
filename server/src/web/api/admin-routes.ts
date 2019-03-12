import {setDateAction} from "../services/dates/date-controller";
import {authAdminJwtHandler} from "../middleware/checks";

export default [
  {
    path: "/api/admin/date/set",
    method: "post",
    handler: [
      authAdminJwtHandler,
      setDateAction,
    ]
  },
];
