import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../app/config";
import { RootState } from "./store";
import { TypedResponse } from "../app/types";

export interface Post {
	id: string;
	from_name: string;
	from_id: string;
	message: string;
	type: string;
	created_time: Date;
}

export interface PostResponse {
	data: {
		page: number;
		posts: Post[];
	};
}
export interface TokenState {
	data: Post[];
	status?: "pending" | "fulfilled" | "rejected";
}

const initialState: TokenState = {
	data: [],
};

export const postsFetcher = async (
	token: string,
	numberOfPages: number,
	startPage = 1
): Promise<Post[]> => {
	const response: TypedResponse<PostResponse> = await fetch(
		config.url.posts(token, startPage)
	);
	const body = await response.json();
	return body.data.posts;
};

export const getPosts = createAsyncThunk(
	"posts/get",
	async (_params, thunkAPI) => {
		const token = (thunkAPI.getState() as RootState).token.value;
		return postsFetcher(token, 1);
	}
);

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getPosts.fulfilled, (state: TokenState, action) => {
			state.data = action.payload;
			state.status = "fulfilled";
		});
		builder.addCase(getPosts.rejected, (state: TokenState) => {
			// TODO proper error handling
			console.log("Error getting token");
			state.status = "rejected";
		});
		builder.addCase(getPosts.pending, (state: TokenState) => {
			state.status = "pending";
		});
	},
});

export default postsSlice.reducer;
