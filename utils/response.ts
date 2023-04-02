import { Response } from "express";

export class ApiResponse {
  successResponse = <T>(res: Response, data: T, message: string) => {
    const result = {
      success: true,
      data,
      err: null,
      message,
      version: "v1.0",
    };
    return res.json(result);
  };

  errorResponse = <E>(res: Response, err: E, message: string, code = 400) => {
    const result = {
      success: false,
      data: null,
      err,
      message,
      version: "v1.0",
    };
    return res.status(code).json(result);
  };
}
