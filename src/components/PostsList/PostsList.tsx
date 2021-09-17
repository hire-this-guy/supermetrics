import React, { useState } from "react";
import { Post } from "../../store/postsSlice";
import PostItem from "../PostItem/PostItem";

const PostsList: React.FC<{ posts: Post[] }> = ({ posts }) => {
	const sortByDate = (a: Post, b: Post) => {
		if (b.created_time === a.created_time) {
			return 0;
		}
		return b.created_time > a.created_time ? -1 : 1;
	};
	const sortedPosts = posts.sort(sortByDate);
	const [sortReverse, setSortReverse] = useState(false);
	const [search, setSearch] = useState("");

	const toggleReverse = () => {
		setSortReverse(!sortReverse);
	};

	if (posts.length === 0) {
		return <div>Please select an author</div>;
	}

	const getDataToDisplay = () => {
		if (search.length === 0) {
			return sortReverse ? sortedPosts : sortedPosts.reverse();
		} else {
			// TODO better handling of spaces
			const result = sortedPosts.filter((post) =>
				post.message.toLowerCase().includes(search.toLowerCase().trim())
			);
			return sortReverse ? result : result.reverse();
		}
	};
	return (
		<div className="PostsList">
			<h2>
				{sortedPosts.length} posts by {sortedPosts[0].from_name}
			</h2>
			<input
				type="search"
				placeholder="search posts"
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button onClick={() => setSortReverse(false)}>newest first</button>
			<button onClick={() => setSortReverse(true)}>oldest first</button>
			{getDataToDisplay().map((post) => (
				<PostItem data={post} key={post.id} />
			))}
		</div>
	);
};

export default PostsList;
