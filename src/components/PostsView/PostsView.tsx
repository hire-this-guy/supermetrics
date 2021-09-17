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
	const selectPostsStatus = useSelector(
		(state: RootState) => state.posts.status === "pending"
	);

	if (selectPosts.length === 0 && !selectPostsStatus) {
		dispatch(getPosts(config.pagesToGet));
	}
	const getFilteredPosts = () => {
		return selectPosts.filter((post) => post.from_id === authorId);
	};

	return (
		<section className="PostsView">
			<AuthorsList setAuthor={setAuthorId} />
			<PostsList posts={getFilteredPosts()} />
		</section>
	);
};
export default PostsView;
