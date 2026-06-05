import express from "express";
import ENV from "./env/index.js";
import router from "./routers/index.js";

const app = express();
app.use(express.json());
app.use("/api-v1", router);

app.listen(ENV.APPLICATION_PORT, () => {
  console.log(`Server is running on port ${ENV.APPLICATION_PORT}`);
});
