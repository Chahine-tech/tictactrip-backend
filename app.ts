import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import routes from "./routes";
import cors from "cors";

const app: Express = express();
const port = 8000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(bodyParser.text({ type: "text/plain" }));
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
