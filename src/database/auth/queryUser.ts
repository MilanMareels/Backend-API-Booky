import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { User } from '../../types/User';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryUser = async (username: string): Promise<User | unknown> => {
	try {
		const user = await client
			.db(database)
			.collection('Users')
			.findOne({ username: username });

		return user;
	} catch (error) {
		return error;
	}
};
