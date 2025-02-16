import express from "express";
import { register } from "../controller/registration.controller.js";
import { login } from "../controller/login.controller.js";
import { forgotPassword } from "../controller/forgotPassword.controller.js";
import { logout } from "../controller/logout.controller.js";
import isAuthenticated from "../middleware/auth.middleware.js";

const router = express.Router();

const home = ((req, res) => {
    res.send("Request Received");
});

router.route("/").get(home);
router.route("/registration").post(register);
router.route("/login").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/logout").post(isAuthenticated, logout);

export default router; 