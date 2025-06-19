import { errorTypes } from '../errors/error';

export const createResponseObject = (
	statusCode: number,
	body: any, // eslint-disable-line @typescript-eslint/no-explicit-any
	res: any, // eslint-disable-line @typescript-eslint/no-explicit-any
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
	return res.status(statusCode).json(body);
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const handleErrors = (
	error: any, // eslint-disable-line @typescript-eslint/no-explicit-any
	res: any, // eslint-disable-line @typescript-eslint/no-explicit-any
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
	const { message, statusCode } = checkErrorType(error);
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return createResponseObject(statusCode!, { message: message }, res);
};

const checkErrorType = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error: any,
): {
	message: string | undefined;
	statusCode: number | undefined;
} => {
	let message, statusCode;
	for (const errorType of errorTypes) {
		if (error instanceof errorType) {
			message = error.message;
			statusCode = error.statusCode;
			break;
		}
	}
	return { message, statusCode };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNullOrUndefined = (obj: any): boolean => {
	return obj === null || obj === undefined;
};
