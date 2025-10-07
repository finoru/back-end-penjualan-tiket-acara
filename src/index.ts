import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./routes/api";

import db from "./utils/database";
import docs from "./docs/route";

async function init() {
  try {
    const result = await db();
    console.log(`Database status: ${result}`);

    const app = express();

    const PORT = 3000;

    app.use(cors());
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      return res.status(200).json({
        message: "Server is running!, bismillah fullstack",
        data: null,
      });
    });

    app.use("/api", router);
    docs(app);

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {}
}

init();
