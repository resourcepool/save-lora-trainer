import {getDateAction, setDateAction} from './date-controller';

export default [
  {
    path: "/api/public/date",
    method: "get",
    handler: [
      getDateAction,
    ]
  },
  {
    path: "/api/public/date/set",
    method: "post",
    handler: [
      setDateAction,
    ]
  },
];
