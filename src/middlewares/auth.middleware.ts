import { Request, Response, NextFunction } from "express";
import { getDataUser, IUserToken } from "../utils/jwt";

export interface IReqUser extends Request {
  user?: IUserToken;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers?.authorization;

  if (!authorization) {
    return res.status(403).json({
      message: "unauthorized",
      data: null,
    });
  }

  const [prefix, accessToken] = authorization.split(" ");
  console.log(prefix, accessToken);

  if (!(prefix === "Bearer" && accessToken)) {
    return res.status(403).json({
      message: "unauthorized",
      data: null,
    });
  }

  const user = getDataUser(accessToken);

  if (!user) {
    return res.status(403).json({
      message: "unauthorized",
      data: null,
    });
  }

  (req as IReqUser).user = user;

  next();
};
