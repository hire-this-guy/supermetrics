import React, { useState } from "react";
import { getPosts, Post } from "../../store/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Author from "../Author/Author";
import { createSelector } from "@reduxjs/toolkit";

const AuthorsList: React.FC = () => {
	interface AuthorData {
		id: Post["from_id"];
		name: Post["from_name"];
		count: number;
	}

	const sortByName = (a: AuthorData, b: AuthorData) => {
		return b.name.localeCompare(a.name);
	};

	const [sortReverse, setSortReverse] = useState(false);

	const handleReverse = () => {
		setSortReverse(!sortReverse);
	};

	const authorsData = createSelector<RootState, Post[], AuthorData[]>(
		(state: RootState) => state.posts.data,
		(posts: Post[]) => {
			const ids = new Set<Post["from_id"]>();
			const counts = new Map<Post["from_id"], number>();
			const namesIdDict = new Map<Post["from_id"], Post["from_name"]>();

			posts.forEach((item) => {
				counts.set(item.from_id, (counts.get(item.from_id) ?? 0) + 1);
				namesIdDict.set(item.from_id, item.from_name);
				ids.add(item.from_id);
			});

			return [...ids]
				.map((id) => {
					return {
						id,
						name: namesIdDict.get(id) as string,
						count: counts.get(id) as number,
					};
				})
				.sort(sortByName);
		}
	);

	const dataToDisplay = useSelector(authorsData);

	// No need to create selector for so few entries
	const getDataToDisplay = () =>
		sortReverse ? dataToDisplay : dataToDisplay.reverse();

	return (
		<div>
			<h2>Authors</h2>
			<button onClick={handleReverse}>reverse</button>
			{getDataToDisplay().map((author) => {
				return (
					<Author
						name={author.name}
						numberOfPosts={author.count}
						id={author.id}
						key={author.id}
					/>
				);
			})}
		</div>
	);
};

export default AuthorsList;
