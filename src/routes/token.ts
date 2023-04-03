import { Router } from "express";
import { ApiResponse } from "../../utils/response";
const api = Router();
const apiResponse = new ApiResponse();

/**
 * @swagger
 * /token:
 *   post:
 *     summary: Créer un jeton
 *     description: Cette route permet de créer un jeton pour un utilisateur.
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Adresse e-mail de l'utilisateur
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: Jeton créé avec succès
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *       400:
 *         description: Mauvaise requête
 *       429:
 *         description: Trop de requêtes
 */

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
