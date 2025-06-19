import express from 'express';

import { createResponseObject, handleErrors } from '../../common/common';
import { verifyToken } from '../../common/auth/verify';

const router = express.Router();

router.get('/books', verifyToken, async (req: any, res) => {
	try {
		const username = req.user.username;
		return createResponseObject(200, { message: username }, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
