export const apiBase = "https://api.supermetrics.com/assignment" as const;
export const config = {
	tokenStorage: {
		tokenKey: "tokenValue",
		TTLKey: "tokenTTL",
		ttl: 60 * 60 * 1000 - 500, // consider token expired 500ms before actual expiration to account for request time
	},
	clientId: "ju16a6m81mhid5ue1z3v2g0uh",
	pagesToGet: 10,
	url: {
		register: `${apiBase}/register`,
		posts: (token: string, page: number) =>
			`${apiBase}/posts?sl_token=${token}&page=${page}`,
	},
} as const;
