import {checkClientIdPathVariable, checkNumberIdPathVariable} from '../../middleware/checks';
import {getJoinRequestSupportedChallenge, submitJoinRequestSupportedChallenge} from './challenge-controller';

export default [
  {
    path: "/api/v1/challenges/joinrequestsupported/client/:clientId",
    method: "get",
    handler: [
      checkClientIdPathVariable,
      getJoinRequestSupportedChallenge,
    ]
  },
  {
    path: "/api/v1/challenges/joinrequestsupported/:id",
    method: "post",
    handler: [
      checkNumberIdPathVariable,
      submitJoinRequestSupportedChallenge,
    ]
  },
];
