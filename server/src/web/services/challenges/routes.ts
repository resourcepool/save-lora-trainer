import {checkClientIdPathVariable, checkNumberIdPathVariable} from '../../middleware/checks';
import {
  getJoinRequestDecodeChallenge,
  getJoinRequestSupportedChallenge, submitJoinRequestDecodeChallenge,
  submitJoinRequestSupportedChallenge
} from './challenge-controller';

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
  {
    path: "/api/v1/challenges/joinrequestdecode/client/:clientId",
    method: "get",
    handler: [
      checkClientIdPathVariable,
      getJoinRequestDecodeChallenge,
    ]
  },
  {
    path: "/api/v1/challenges/joinrequestdecode/:id",
    method: "post",
    handler: [
      checkNumberIdPathVariable,
      submitJoinRequestDecodeChallenge,
    ]
  },
];
