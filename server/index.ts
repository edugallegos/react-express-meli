import dotenv from "dotenv";
import express, {Express} from "express";
import cors from "cors";
import router from "./routes/items";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use("/api/items", router);

export default app;
