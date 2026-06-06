// import express from "express";
// import { login, logout, register, updateProfile } from "../controllers/user.controller.js";

// const router =express.Router();

// router.router("/register").post(register);
// router.router("/login").post(login);
// router.router("/logout").get(logout);
// router.router("/profile/update").post(isAu,updateProfile);

// // router.router("/register").post(register);
// // router.router("/login").post(login);
// // router.router("/profile/update").post(isAuthenticated,updateProfile);

// export default router;

import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isAuthenticated, updateProfile);

export default router;