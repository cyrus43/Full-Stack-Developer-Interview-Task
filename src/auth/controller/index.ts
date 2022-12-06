import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const userCredentials = {
	username: "admin",
	password: "@Password1234",
	email: "admin@express.com",
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	// Checking if credentials match
	if (
		username === userCredentials.username &&
		password === userCredentials.password
	) {
		//creating a access token
		const accessToken = jwt.sign(
			{
				username: userCredentials.username,
				email: userCredentials.email,
			},
			accessTokenSecret as Secret,
			{
				expiresIn: "5m",
			}
		);
		// Creating refresh token not that expiry of refresh
		//token is greater than the access token

		const refreshToken = jwt.sign(
			{
				username: userCredentials.username,
			},
			refreshTokenSecret as Secret,
			{ expiresIn: "7d" }
		);

		return res.json({ accessToken, refreshToken });
	} else {
		// Return unauthorized error if credentials don't match
		return res.status(406).json({
			message: "Invalid credentials",
		});
	}
};

export const refresh = async (req: Request, res: Response) => {
	const authHeader = req.headers?.authorization;
	if (authHeader?.split(" ")[0] === "Bearer") {
		// Destructuring refreshToken from cookie
		const refreshToken = authHeader?.split(" ")[1] as string;

		// Verifying refresh token
		// @ts-ignore
		jwt.verify(refreshToken, refreshTokenSecret as Secret, (err, decoded) => {
			console.log(refreshTokenSecret);
			if (err) {
				// Wrong Refesh Token
				return res.status(406).json({ message: "Unauthorized" });
			} else {
				// Correct token we send a new access token
				const accessToken = jwt.sign(
					{
						username: userCredentials.username,
						email: userCredentials.email,
					},
					accessTokenSecret as Secret,
					{
						expiresIn: "5m",
					}
				);
				return res.json({ accessToken });
			}
		});
	} else {
		return res.status(406).json({ message: "Unauthorized" });
	}
};

export const whoami = async (req: Request, res: Response) => {
	return res.json({ success: true });
};
