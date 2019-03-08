import {checkClientIdPathVariable, checkNumberIdPathVariable} from '../../middleware/checks';
import {
  getJoinRequestDecodeChallenge,
  getJoinRequestSupportedChallenge, submitJoinRequestDecodeChallenge,
  submitJoinRequestSupportedChallenge
} from './challenge-controller';

export default [
  {
    path: "/api/public/challenges/joinrequestsupported/client/:clientId",
    method: "get",
    handler: [
      checkClientIdPathVariable,
      getJoinRequestSupportedChallenge,
    ]
  },
  {
    path: "/api/public/challenges/joinrequestsupported/:id",
    method: "post",
    handler: [
      checkNumberIdPathVariable,
      submitJoinRequestSupportedChallenge,
    ]
  },
  {
    path: "/api/public/challenges/joinrequestdecode/client/:clientId",
    method: "get",
    handler: [
      checkClientIdPathVariable,
      getJoinRequestDecodeChallenge,
    ]
  },
  {
    path: "/api/public/challenges/joinrequestdecode/:id",
    method: "post",
    handler: [
      checkNumberIdPathVariable,
      submitJoinRequestDecodeChallenge,
    ]
  },
];
