import proxy from "express-http-proxy";
import {config} from "../../../config";

const authHeader = "Grpc-Metadata-Authorization";

const devicesHandler = proxy(config.loRaServer.baseUrl, {
  proxyReqPathResolver: (req) => {
    return "/api/devices";
  },
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    // you can update headers
    // @ts-ignore
    proxyReqOpts.headers[authHeader] = "Bearer " + config.loRaServer.authToken;
    return proxyReqOpts;
  }
});

const deviceKeysHandler = proxy(config.loRaServer.baseUrl, {
  proxyReqPathResolver: (req) => {
    let devEUI = req.url.substr("/api/v1/proxy/devices/".length).split("/")[0];
    return `/api/devices/${devEUI}/keys`;
  },
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    // you can update headers
    // @ts-ignore
    proxyReqOpts.headers[authHeader] = "Bearer " + config.loRaServer.authToken;
    return proxyReqOpts;
  }
});

export default [
  {
    path: "/api/proxy/devices",
    method: "post",
    handler: [
      devicesHandler
    ]
  },
  {
    path: "/api/proxy/devices/:devEUI/keys",
    method: "get",
    handler: [
      deviceKeysHandler
    ]
  },
  {
    path: "/api/proxy/devices/:devEUI/keys",
    method: "put",
    handler: [
      deviceKeysHandler
    ]
  },
  {
    path: "/api/proxy/devices/:devEUI/keys",
    method: "post",
    handler: [
      deviceKeysHandler
    ]
  },
];
