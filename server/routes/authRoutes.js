import express from "express";
import authController from "../controllers/authController.js";
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    data: "hello world from kaloraat auth API",
  });
});
router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/password/forgot", authController.forgotPassword);
router.post("/password/reset", authController.resetPassword);

export default router;
