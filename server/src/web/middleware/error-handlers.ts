import { Request, Response, NextFunction, Router } from "express";
import * as ErrorHandler from "../utils/error-handler";
import {HTTP401Error} from "../utils/http-errors";

const handle404Error = (router: Router) => {
  router.use((req: Request, res: Response) => {
    ErrorHandler.notFoundError();
  });
};

const handleClientError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (err.status && err.status === 401) {
      ErrorHandler.clientError(new HTTP401Error(err.message), res, next);
      return;
    }
    ErrorHandler.clientError(err, res, next);
  });
};

const handleServerError = (router: Router) => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.serverError(err, res, next);
  });
};

export default [handle404Error, handleClientError, handleServerError];
