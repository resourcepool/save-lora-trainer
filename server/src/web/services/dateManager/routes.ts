import {getDateAction, setDateAction} from './date-controller';

export default [
  {
    path: "/api/v1/date",
    method: "get",
    handler: [
      getDateAction,
    ]
  },
  {
    path: "/api/v1/date/set",
    method: "post",
    handler: [
      setDateAction,
    ]
  },
];
