import React from "react";
import { Post } from "../../store/postsSlice";
import PostItem from "../PostItem/PostItem";

const PostsList: React.FC<{ posts: Post[] }> = ({ posts }) => {
	if (posts.length === 0) {
		return <div>Please select an author</div>;
	}

	return (
		<div className="PostsList">
			<h2>
				{posts.length} posts by {posts[0].from_name}
			</h2>
			{posts.map((post) => (
				<PostItem data={post} />
			))}
		</div>
	);
};

export default PostsList;
