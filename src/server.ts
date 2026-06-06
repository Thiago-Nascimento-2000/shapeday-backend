import app from "./app.js";
import ENV from "./env/index.js";

app.listen(ENV.APPLICATION_PORT, () => {
  console.log(`Server is running on port ${ENV.APPLICATION_PORT}`);
});
