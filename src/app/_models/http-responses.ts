export class UserCredResponse {
	success: boolean;
	errorCode: number;
	userId: string;
	email: string;
	token: string;
	expiration: string;
	isActive: boolean;
}