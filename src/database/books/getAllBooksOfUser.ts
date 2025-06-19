import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { Book } from '../../types/Book';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryAllBooksOfUser = async (): Promise<Book | unknown> => {
	const itemPerPage = 10;
	try {
		const userBooks = await client
			.db(database)
			.collection('Books')
			.find({})
			.toArray();

		return userBooks;
	} catch (error) {
		return error;
	}
};
