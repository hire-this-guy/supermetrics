import React from "react";
import { Post, useGetPostPageQuery } from "../../services/postsApi";
import PostItem from "../post/PostItem";
import { config } from "../../app/config";

const PostsList: React.FC<{ token: string }> = ({ token }) => {
	// This is the best way I found to make batch queries with RTK
	// TODO make it better

	const results = [];
	for (let i = 1; i < config.pagesToGet + 1; i++) {
		results.push(useGetPostPageQuery({ token, page: i }));
	}
	const data: Post[] = results
		.filter((result) => result.status === "fulfilled")
		.flatMap((result) => result.data as unknown as Post);
	const isLoading = results.some((result) => result.status === "pending");
	const hasErrors = results.some((result) => result.status === "rejected");

	return (
		<div>
			<div>Posts downloaded {data?.length ?? 0}</div>
			{hasErrors && <div>Couldn't fetch one or more pages</div>}
			{isLoading && <div>is loading... </div>}
			{data.map((post) => (
				<PostItem data={post} key={post.id} />
			))}
		</div>
	);
};

export default PostsList;
