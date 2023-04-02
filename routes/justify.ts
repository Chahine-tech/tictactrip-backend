import { Router, Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/response";
import extractTokenMiddleware from "../middlewares/authorization";
const api = Router();
const apiResponse = new ApiResponse();
const WORDS_PER_DAY_LIMIT = 80000;
const wordsProcessedMap = new Map<string, number>();

/**
 * @swagger
 * /justify:
 *   post:
 *     summary: Justifier un texte
 *     description: Cette route permet de justifier un texte fourni dans le corps de la requête.
 *     consumes:
 *       - "text/plain"
 *     produces:
 *       - "text/plain"
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Texte à justifier
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Texte justifié
 *         schema:
 *           type: string
 *       400:
 *         description: Mauvaise requête
 *       401:
 *         description: Non autorisé
 *       429:
 *         description: Trop de requêtes
 */

api.post(
  "/",
  extractTokenMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization.split(" ")[1];
    const text = req.body as string;
    if (!token || typeof token !== "string") {
      return apiResponse.errorResponse(res, null, "Invalid token");
    }
    const wordsProcessed = wordsProcessedMap.get(token) || 0;
    if (wordsProcessed + text.split(" ").length > WORDS_PER_DAY_LIMIT) {
      return apiResponse.errorResponse(res, null, "Payment required", 402);
    }
    wordsProcessedMap.set(token, wordsProcessed + text.split(" ").length);
    const justifiedText = justify(text);
    res.send(justifiedText);
  }
);

function justify(text: string): string {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if (currentLine.length + word.length + 1 <= 80) {
      currentLine += " " + word;
    } else {
      lines.push(justifyLine(currentLine.trim()));
      currentLine = word;
    }
  }

  if (currentLine.length > 0) {
    lines.push(justifyLine(currentLine.trim(), true));
  }

  return lines.join("\n");
}

function justifyLine(line: string, lastLine = false): string {
  if (line.length === 80) {
    return line;
  }
  const words = line.split(" ");
  let spaces = 80 - line.length;
  let spacePerWord = 0;
  let extraSpaces = 0;

  if (words.length > 1 && !lastLine) {
    spacePerWord = Math.floor(spaces / (words.length - 1));
    extraSpaces = spaces % (words.length - 1);
  } else {
    spacePerWord = spaces;
  }

  let justifiedLine = "";

  for (let i = 0; i < words.length; i++) {
    justifiedLine += words[i];

    if (i < words.length - 1) {
      let numSpaces = spacePerWord;

      if (extraSpaces > 0) {
        numSpaces++;
        extraSpaces--;
      }

      justifiedLine += " ".repeat(numSpaces);
    }
  }

  return justifiedLine;
}

export default api;
