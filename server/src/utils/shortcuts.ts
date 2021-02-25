import express from 'express';

export const resOK = (data?: any) => ({
	error: false,
	message: '',
	...data,
});

export const resError = (message: string) => ({
	error: true,
	message,
});

export const sendErrorJSON = (res: express.Response, message: string, statusCode: number) => {
	res.set('Content-Type', 'application/json');
	res.status(statusCode);
	res.json(resError(message));
};
