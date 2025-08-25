

import express from "express";
import { handlePrompt } from "../controllers/dashboardControllers.js";

const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { answers: [], prompt: "" });
});

router.post("/prompt", handlePrompt);

export default router;
