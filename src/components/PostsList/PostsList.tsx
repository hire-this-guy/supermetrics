import React from "react";
import { getPosts, Post } from "../../store/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { config } from "../../app/config";
import Author from "../Author/Author";

const PostsList: React.FC = () => {
	const dispatch = useDispatch();

	const posts = useSelector((state: RootState) => state.posts.data);
	const postsLoading = useSelector(
		(state: RootState) => state.posts.status === "pending"
	);
	const postsError = useSelector(
		(state: RootState) => state.posts.status === "rejected"
	);

	if (posts.length === 0 && !postsLoading) {
		dispatch(getPosts(config.pagesToGet));
	}

	return (
		<div>
			<div>Posts downloaded {posts?.length ?? 0}</div>
			<hr />
			{postsError && <div>Couldn't fetch one or more pages</div>}
			{postsLoading && <div>is loading... </div>}
		</div>
	);
};

export default PostsList;
