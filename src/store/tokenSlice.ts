import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../app/config";
import { TypedResponse } from "../app/types";

export interface TokenState {
	value: string;
	status?: "pending" | "fulfilled" | "rejected";
}

const initialState: TokenState = {
	value: "",
};

interface TokenResponse {
	data: {
		sl_token: string;
	};
}

const tokenFetcher = async (name: string, email: string): Promise<string> => {
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

export const getToken = createAsyncThunk(
	"token/get",
	async (params: { name: string; email: string }) => {
		const { name, email } = params;
		return tokenFetcher(name, email);
	}
);

export const tokenSlice = createSlice({
	name: "token",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getToken.fulfilled, (state: TokenState, action) => {
			state.value = action.payload;
			state.status = "fulfilled";
		});
		builder.addCase(getToken.rejected, (state: TokenState) => {
			// TODO proper error handling
			console.log("Error getting token");
			state.status = "rejected";
		});
		builder.addCase(getToken.pending, (state: TokenState) => {
			state.status = "pending";
		});
	},
});

export default tokenSlice.reducer;
