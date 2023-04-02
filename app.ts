import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import cors from "cors";

const app: Express = express();
const port = 8000;

app.use(bodyParser.text({ type: "text/plain" }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(cors());
app.use("/api", routes);
function Connect() {
  try {
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (e) {
    console.log("error");
  }
}
Connect();
