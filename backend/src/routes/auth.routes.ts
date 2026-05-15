import {Router} from "express";
import {signup, login, getMe} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth";
import {Response, Request} from "express";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/me", authenticate, getMe);
router.get("/help", (req: Request, res: Response) => {
    return res.status(200).json({msg: "hello"});
})

export default router;