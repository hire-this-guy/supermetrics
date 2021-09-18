import React, { useState } from "react";
import AuthorsList from "../AuthorsList/AuthorsList";
import PostsList from "../PostsList/PostsList";
import { getPosts, Post } from "../../store/postsSlice";
import "./PostsView.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { config } from "../../app/config";

const PostsView: React.FC = () => {
	const [authorId, setAuthorId] = useState<Post["from_id"]>("");

	const dispatch = useDispatch();

	const selectPosts = useSelector((state: RootState) => state.posts.data);
	const selectPostsPending = useSelector(
		(state: RootState) => state.posts.status === "pending"
	);
	const selectPostsRejected = useSelector(
		(state: RootState) => state.posts.status === "rejected"
	);

	if (selectPosts.length === 0 && !selectPostsPending) {
		dispatch(getPosts(config.pagesToGet));
	}
	const getFilteredPosts = () => {
		return selectPosts.filter((post) => post.from_id === authorId);
	};

	if (selectPostsRejected) {
		return <div>Error getting posts. Please try again.</div>;
	}

	return (
		<section className="PostsView">
			{selectPostsPending && <div>Loading...</div>}
			<AuthorsList setAuthor={setAuthorId} />
			<PostsList posts={getFilteredPosts()} />
		</section>
	);
};
export default PostsView;
