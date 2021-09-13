import React from "react";
import PostItem from "../post/PostItem";
import { getPosts } from "../../services/postsThunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

const PostsList: React.FC = () => {
	// This is the best way I found to make batch queries with RTK
	// TODO make it better

	const dispatch = useDispatch();

	const posts = useSelector((state: RootState) => state.posts.data);
	const postsLoading = useSelector(
		(state: RootState) => state.posts.status === "pending"
	);
	const postsError = useSelector(
		(state: RootState) => state.posts.status === "rejected"
	);

	if (posts.length === 0 && !postsLoading) {
		console.log("getting posts");
		dispatch(getPosts());
	}

	return (
		<div>
			<div>Posts downloaded {posts?.length ?? 0}</div>
			{postsError && <div>Couldn't fetch one or more pages</div>}
			{postsLoading && <div>is loading... </div>}
			{posts.map((post) => (
				<PostItem data={post} key={post.id} />
			))}
		</div>
	);
};

export default PostsList;
