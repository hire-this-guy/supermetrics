import { Post } from "../../store/postsSlice";
import React from "react";
import { PostItemTestIds } from "./PostItem.testIds";

const PostItem: React.FC<{ data: Post }> = ({ data }) => {
	const createdTime = new Date(data.created_time).toLocaleString();
	return (
		<div>
			<header data-testid={PostItemTestIds.date}>date: {createdTime}</header>
			<p data-testid={PostItemTestIds.message}>{data.message}</p>
			<hr />
		</div>
	);
};

export default PostItem;
