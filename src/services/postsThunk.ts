import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import { tokenFetcher } from "../services/data";
import { config } from "../app/config";
import { RootState } from "../app/store";

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

interface TypedResponse<T> extends Response {
	parsedBody?: T;
}

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
		// const token = thunkAPI.getState()
		console.log("get state", thunkAPI.getState());
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
