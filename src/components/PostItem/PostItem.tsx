import { Post } from "../../store/postsSlice";
import React from "react";
import { PostItemTestIds } from "./PostItem.testIds";
import "./PostItem.css";

const PostItem: React.FC<{ data: Post }> = ({ data }) => {
	const createdTime = new Date(data.created_time).toLocaleString();
	return (
		<div className="PostItem">
			<header data-testid={PostItemTestIds.date}>date: {createdTime}</header>
			<p data-testid={PostItemTestIds.message}>{data.message}</p>
		</div>
	);
};

export default PostItem;
