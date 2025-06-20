import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { createResponseObject, handleErrors } from '../../common/common';
import { queryUser } from '../../database/auth/queryUser';
import { UnauthorizedError } from '../../errors/error';
import { User } from '../../types/User';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;

		const user: User = (await queryUser(email)) as User;

		await checkPassword(password, user.password);

		// Dit geberut pas als ww correct is anders error
		const token = jwt.sign(
			{
				username: user.username,
				email: user.email,
				userId: user.userId,
				profilePicture: user.profilePicture,
				signUpDate: user.signUpDate,
				firstname: user.firstname,
				lastname: user.lastname,
			},
			JWT_SECRET,
			{ expiresIn: '24h' }, // Token verloopt na 24 uur
		);

		return createResponseObject(200, { token }, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

const checkPassword = async (password: string, hash: string): Promise<void> => {
	const match: boolean = await bcrypt.compare(password, hash);
	if (!match) throw new UnauthorizedError();
};

export default router;
