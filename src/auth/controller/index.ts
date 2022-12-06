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
