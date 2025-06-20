import express from 'express';
import bcrypt from 'bcrypt';
import { uuidv7 } from 'uuidv7';
import * as EmailValidator from 'email-validator';
import { AvatarGenerator } from 'random-avatar-generator';
import {
	adjectives,
	colors,
	Config,
	starWars,
	uniqueNamesGenerator,
} from 'unique-names-generator';

import { createResponseObject, handleErrors } from '../../common/common';
import { User } from '../../types/User';
import { ConflictError } from '../../errors/error';
import { errorMessages } from '../../errors/errorMessages';
import { queryGetUserByEmail } from '../../database/user/queryGetUserByEmail';
import { queryAddUser } from '../../database/auth/queryAddUser';

const router = express.Router();

const customConfig: Config = {
	dictionaries: [adjectives, colors, starWars],
	separator: '',
	length: 2,
};

router.post('/register', async (req, res) => {
	try {
		const { password, firstname, lastname, email } = req.body;

		validateEmail(email);
		await doesUserAlreadyExist(email);

		const newUser: User = await createUser(
			password,
			firstname,
			lastname,
			email,
		);

		await queryAddUser(newUser);

		return createResponseObject(
			201,
			{ message: 'User successfully created!' },
			res,
		);
	} catch (error) {
		return handleErrors(error, res);
	}
});

const validateEmail = (email: string) => {
	const validate: boolean = EmailValidator.validate(email);
	if (!validate) throw new ConflictError(errorMessages.unvalidEmail);
};

const createUser = async (
	password: string,
	firstname: string,
	lastname: string,
	email: string,
): Promise<User> => {
	const user: User = {
		username: uniqueNamesGenerator(customConfig),
		password: await bcrypt.hash(password, 12),
		firstname: firstname,
		lastname: lastname,
		email: email,
		profilePicture: generateRandomProfilePicture(),
		signUpDate: Date.now(),
		userId: uuidv7(),
	};
	return user;
};

const doesUserAlreadyExist = async (email: string): Promise<void> => {
	const foundUser: User = (await queryGetUserByEmail(email)) as User;

	if (foundUser !== null)
		throw new ConflictError(errorMessages.userAlreadyExist);
};

const generateRandomProfilePicture = (): string => {
	const generator = new AvatarGenerator();
	return generator.generateRandomAvatar();
};

export default router;
