import {checkClientIdPathVariable, checkTeamParams} from '../../middleware/checks';
import {createDevice} from './proxy-controller';
import proxy from "express-http-proxy";
import {config} from "../../../config";

const authHeader = "Grpc-Metadata-Authorization";

export default [
  {
    path: "/api/v1/proxy/devices",
    method: "get",
    handler: [
      proxy(config.loRaServer.baseUrl, {
        proxyReqPathResolver: (req) => {
          return "/api/devices";
        },
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
          // you can update headers
          // @ts-ignore
          proxyReqOpts.headers[authHeader] = "Bearer " + config.loRaServer.authToken;
          return proxyReqOpts;
        }
      })
    ]
  },
  {
    path: "/api/v1/proxy/devices",
    method: "post",
    handler: [
      proxy(config.loRaServer.baseUrl)
    ]
  },
  {
    path: "/api/v1/proxy/devices/:devEUI/keys",
    method: "get",
    handler: [
      proxy(config.loRaServer.baseUrl)
    ]
  },
  {
    path: "/api/v1/proxy/devices/:devEUI/keys",
    method: "put",
    handler: [
      proxy(config.loRaServer.baseUrl)
    ]
  },
  {
    path: "/api/v1/proxy/devices/:devEUI/keys",
    method: "post",
    handler: [
      proxy(config.loRaServer.baseUrl)
    ]
  },
];
