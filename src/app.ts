import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/Routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app: Application = express();
//
// parsers
app.use(express.json());
app.use(cors());

// applications route
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
