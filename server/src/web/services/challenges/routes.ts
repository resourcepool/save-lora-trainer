import {checkDevEUIPathVariable} from '../../middleware/checks';
import {getJoinRequestSupportedChallenge} from './challenge-controller';

export default [
  {
    path: "/api/v1/challenges/joinrequestsupported/:devEUI",
    method: "get",
    handler: [
      checkDevEUIPathVariable,
      getJoinRequestSupportedChallenge,
    ]
  },
];
