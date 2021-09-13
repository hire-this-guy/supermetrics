import { Post } from "../../store/postsSlice";
import React from "react";

const PostItem: React.FC<{ data: Post }> = ({ data }) => {
	return (
		<div>
			title: {data.from_name}
			date: {data.created_time}
			body: {data.message}
			<hr />
		</div>
	);
};

export default PostItem;
