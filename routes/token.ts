import { Router } from "express";
import { ApiResponse } from "../utils/response";
import extractTokenMiddleware from "../middlewares/authorization";
const api = Router();
const apiResponse = new ApiResponse();

function generateToken(): string {
  const tokenLength = 20;
  const possibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    token += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
  }
  return token;
}

api.post("/", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return apiResponse.errorResponse(res, email, "Email is required");
  }
  const token = generateToken();
  return apiResponse.successResponse(res, token, "Success");
});
export default api;
