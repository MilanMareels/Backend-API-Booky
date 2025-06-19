import jwt from 'jsonwebtoken';

// JWT Secret - in productie in een environment variable zetten!
const JWT_SECRET = 'je_veilige_secret_sleutel_hier';

// Middleware om token te verifiëren
export const verifyToken = (req: any, res: any, next: any) => {
	const token = req.headers['authorization'];

	if (!token) {
		return res
			.status(403)
			.json({ message: 'Token is vereist voor authenticatie' });
	}

	try {
		const bearerToken = token.split(' ')[1]; // Verwijder 'Bearer ' uit de header
		const decoded = jwt.verify(bearerToken, JWT_SECRET);
		req.user = decoded;
	} catch (err) {
		return res.status(401).json({ message: 'Ongeldig token' });
	}

	return next();
};
