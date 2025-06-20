import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { User } from '../../types/User';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAddUser = async (user: User) => {
	try {
		await client.db(database).collection('Users').insertOne(user);
	} catch (error) {
		return error;
	}
};
