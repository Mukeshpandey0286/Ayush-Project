import express from 'express';
import {loginController,logoutController,registerController} from "../userController/userController.js";

// initializing router..
const router = express.Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").get(logoutController);

export default  router;