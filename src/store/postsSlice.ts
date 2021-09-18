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
	created_time: string;
}

export interface PostResponse {
	data: {
		page: number;
		posts: Post[];
	};
}
export interface PostsState {
	data: Post[];
	status?: "pending" | "fulfilled" | "rejected";
}

const initialState: PostsState = {
	data: [],
};

export const postsFetcher = async (
	token: string,
	page: number
): Promise<Post[]> => {
	const response: TypedResponse<PostResponse> = await fetch(
		config.url.posts(token, page)
	);
	const body = await response.json();
	return body.data.posts;
};

export const getPosts = createAsyncThunk(
	"posts/get",
	async (pages: number, thunkAPI) => {
		const token = (thunkAPI.getState() as RootState).token.value;
		const requests = [];
		for (let i = 1; i < pages + 1; i++) {
			requests.push(postsFetcher(token, i));
		}
		const responses = await Promise.all(requests);
		return responses.flat();
	}
);

export const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getPosts.fulfilled, (state: PostsState, action) => {
			state.data = action.payload;
			state.status = "fulfilled";
		});

		builder.addCase(getPosts.rejected, (state: PostsState) => {
			state.status = "rejected";
		});
		builder.addCase(getPosts.pending, (state: PostsState) => {
			state.status = "pending";
		});
	},
});

export default postsSlice.reducer;
