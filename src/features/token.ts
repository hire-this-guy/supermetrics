import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tokenFetcher } from "../services/data";

export interface TokenState {
	value: string;
	status?: "pending" | "fulfilled" | "rejected";
}

const initialState: TokenState = {
	value: "",
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
