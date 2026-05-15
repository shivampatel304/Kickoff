"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/signup", auth_controller_1.signup);
router.post("/login", auth_controller_1.login);
router.post("/me", auth_1.authenticate, auth_controller_1.getMe);
router.get("/help", (req, res) => {
    return res.status(200).json({ msg: "hello" });
});
exports.default = router;
