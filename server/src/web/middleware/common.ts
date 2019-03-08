import {Router} from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import {NextFunction, Request, Response} from "express-serve-static-core";
import {config} from "../../config";
import expressJwt from "express-jwt";

export const handleCors = (router: Router) =>
    router.use(cors({credentials: true, origin: true}));

const proxyJwtHandler = expressJwt({secret: config.proxySecret});
const publicJwtHandler = expressJwt({secret: config.publicSecret});

export const handleAuth = (router: Router) => {
    router.use((req: Request, res: Response, next: NextFunction) => {
      if (req.url.indexOf("proxy") !== -1) {
        // Handle proxy auth
        return proxyJwtHandler(req, res, next);
      } else {
        // Handle public auth
        return publicJwtHandler(req, res, next);
      }
    });
};

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({extended: true}));
  router.use(parser.json());
};

export const handleCompression = (router: Router) => {
  router.use(compression());
};
