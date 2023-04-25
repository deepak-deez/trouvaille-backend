import express, { request } from "express";
import cors from "cors";
import { dataConnection } from "./connection.js";
import * as appRouter from "./routes/route.js";

dataConnection();

const app = express();
app.use(express.json());
app.use(cors());
app.use(appRouter.app);

app.listen(3000, "127.0.0.1");
export default app;
