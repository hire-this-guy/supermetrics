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

	const authorNames = useSelector((state: RootState) => {
		const dictionary = new Map<Post["from_id"], Post["from_name"]>();
		state.posts.data.forEach((item) => {
			dictionary.set(item.from_id, item.from_name);
		});
		return dictionary;
	});

	const authorsWithCount = useSelector((state: RootState) => {
		const authors = new Map<Post["from_id"], number>();
		state.posts.data.forEach((item) => {
			authors.set(item.from_id, (authors.get(item.from_id) ?? 0) + 1);
		});
		return [...authors];
	});

	if (posts.length === 0 && !postsLoading) {
		dispatch(getPosts(config.pagesToGet));
	}

	return (
		<div>
			<div>Posts downloaded {posts?.length ?? 0}</div>
			<hr />
			{postsError && <div>Couldn't fetch one or more pages</div>}
			{postsLoading && <div>is loading... </div>}
			{authorsWithCount.map((author) => (
				<Author
					name={authorNames.get(author[0]) as string}
					numberOfPosts={author[1]}
				/>
			))}
		</div>
	);
};

export default PostsList;
