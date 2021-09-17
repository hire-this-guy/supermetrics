import { Post } from "../../store/postsSlice";
import React from "react";

const PostItem: React.FC<{ data: Post }> = ({ data }) => {
	const createdTime = new Date(data.created_time).toLocaleString();
	return (
		<div>
			<header>date: {createdTime}</header>
			<p>{data.message}</p>
			<hr />
		</div>
	);
};

export default PostItem;
