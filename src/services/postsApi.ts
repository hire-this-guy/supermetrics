import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBase, config } from "../app/config";

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

// Define a service using a base URL and expected endpoints
export const postsApi = createApi({
	reducerPath: "postsApi",
	baseQuery: fetchBaseQuery({ baseUrl: apiBase }),
	endpoints: (builder) => ({
		getPostPage: builder.query<Post[], { token: string; page: number }>({
			query: (params: { token: string; page: number }) =>
				config.url.posts(params.token, params.page),
			transformResponse: (rawResult: PostResponse) => {
				return rawResult.data.posts;
			},
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPostPageQuery } = postsApi;
