import express from 'express';

import getAllBooksOfUser from './books/getAllBookOfUser';

import login from './auth/login';

import { closeDatabase, connectDatabase } from '../database/db';

const router = express.Router();

// Achter deze API endpoint zitten al de endpoints. {baseUrl}/api/v1/{api-endpoint}
router.get('/', async (req, res) => {
	try {
		await connectDatabase();
		return res.json({
			message: 'API V1',
		});
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
});

// Hier worden de beveiligde endpoints gedefinieerd die gebruikt moeten worden door de router.

// Books
router.use(getAllBooksOfUser);

// Login
router.use(login);

export default router;
