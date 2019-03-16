import proxy from "express-http-proxy";
import {config} from "../../config";
import {authProxyJwtHandler} from "../middleware/checks";

const authHeader = "Grpc-Metadata-Authorization";

const devicesHandler = proxy(config.loRaServer.baseUrl, {
    proxyReqPathResolver: (req) => {
        return "/api/devices";
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        // you can update headers
        // @ts-ignore
        proxyReqOpts.headers["Authorization"] = "Bearer " + config.loRaServer.authToken;
        proxyReqOpts.headers![authHeader] = "Bearer " + config.loRaServer.authToken;
        return proxyReqOpts;
    }
});


const deviceHandler = proxy(config.loRaServer.baseUrl, {
    proxyReqPathResolver: (req) => {
        let devEUI = req.url.substr("/api/proxy/devices/".length).split("/")[0];
        return `/api/devices/${devEUI}`;
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        // you can update headers
        // @ts-ignore
        proxyReqOpts.headers["Authorization"] = "Bearer " + config.loRaServer.authToken;
        proxyReqOpts.headers![authHeader] = "Bearer " + config.loRaServer.authToken;
        return proxyReqOpts;
    }
});

const deviceKeysHandler = proxy(config.loRaServer.baseUrl, {
    proxyReqPathResolver: (req) => {
        let devEUI = req.url.substr("/api/proxy/devices/".length).split("/")[0];
        return `/api/devices/${devEUI}/keys`;
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        // you can update headers
        // @ts-ignore
        proxyReqOpts.headers["Authorization"] = "Bearer " + config.loRaServer.authToken;
        proxyReqOpts.headers![authHeader] = "Bearer " + config.loRaServer.authToken;
        return proxyReqOpts;
    }
});

export default [
    {
        path: "/api/proxy/devices/:devEUI",
        method: "get",
        handler: [
            authProxyJwtHandler,
            deviceHandler
        ]
    },
    {
        path: "/api/proxy/devices",
        method: "post",
        handler: [
            authProxyJwtHandler,
            devicesHandler
        ]
    },
    {
        path: "/api/proxy/devices/:devEUI/keys",
        method: "get",
        handler: [
            authProxyJwtHandler,
            deviceKeysHandler
        ]
    },
    {
        path: "/api/proxy/devices/:devEUI/keys",
        method: "put",
        handler: [
            authProxyJwtHandler,
            deviceKeysHandler
        ]
    },
    {
        path: "/api/proxy/devices/:devEUI/keys",
        method: "post",
        handler: [
            authProxyJwtHandler,
            deviceKeysHandler
        ]
    },
];
