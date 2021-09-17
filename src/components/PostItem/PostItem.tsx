import { Post } from "../../store/postsSlice";
import React from "react";

const PostItem: React.FC<{ data: Post }> = ({ data }) => {
	return (
		<div>
			<header>date: {data.created_time}</header>
			<p>{data.message}</p>
			<hr />
		</div>
	);
};

export default PostItem;
