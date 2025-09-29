import express from "express";
import bodyParser from "body-parser";

import router from "./routes/api";

import db from "./utils/database";

async function init() {
  try {
    const result = await db();
    console.log(`Database status: ${result}`);

    const app = express();

    const PORT = 3000;

    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      return res
        .status(200)
        .json({
          message: "Server is running!, bismillah fullstack",
          data: null,
        });
    });

    app.use("/api", router);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {}
}

init();
