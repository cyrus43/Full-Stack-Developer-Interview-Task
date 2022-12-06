import { Router, Request, Response } from "express";

import { login, refresh } from "./controller";

const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response) => {
	login(req, res);
});

authRouter.post("/refresh", (req: Request, res: Response) => {
	refresh(req, res);
});

export default authRouter;
