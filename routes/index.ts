import { Router } from "express";
import justify from "./justify";
import token from "./token";

const api = Router();

api.use("/justify", justify);
api.use("/token", token);

export default api;
