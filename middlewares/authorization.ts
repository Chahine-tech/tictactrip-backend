import { Request, Response, NextFunction } from "express";

interface RequestWithToken extends Request {
  token?: string;
}

const extractTokenMiddleware = (
  req: RequestWithToken,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid authorization header" });
  }

  req.token = token;
  next();
};

export default extractTokenMiddleware;
