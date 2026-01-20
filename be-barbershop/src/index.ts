import express from "express";
import cors from "cors";
import router from "./router/index";
import "./config/cloudinary";
import { errorGlobalMiddleware } from "./middleware/error.middleware";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);

app.use(errorGlobalMiddleware);

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
