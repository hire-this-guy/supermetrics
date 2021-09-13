import { config } from "../app/config";

interface TokenResponse {
	data: {
		sl_token: string;
	};
}

interface TypedResponse<T> extends Response {
	parsedBody?: T;
}

export const tokenFetcher = async (
	name: string,
	email: string
): Promise<string> => {
	const response: TypedResponse<TokenResponse> = await fetch(
		config.url.register,
		{
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify({
				client_id: config.clientId,
				email,
				name,
			}),
		}
	);
	const body = await response.json();
	return body.data.sl_token;
};
