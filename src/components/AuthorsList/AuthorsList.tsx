import React, { useState } from "react";
import { Post } from "../../store/postsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Author from "../Author/Author";
import { createSelector } from "@reduxjs/toolkit";

const AuthorsList: React.FC<{ setAuthor: (value: Post["from_id"]) => void }> =
	({ setAuthor }) => {
		interface AuthorData {
			id: Post["from_id"];
			name: Post["from_name"];
			count: number;
		}

		const sortByName = (a: AuthorData, b: AuthorData) => {
			return b.name.localeCompare(a.name);
		};

		const [sortReverse, setSortReverse] = useState(false);
		const [search, setSearch] = useState("");

		const toggleReverse = () => {
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
		const getDataToDisplay = () => {
			if (search.length === 0) {
				return sortReverse ? dataToDisplay : dataToDisplay.reverse();
			} else {
				// TODO better handling of spaces
				const result = dataToDisplay.filter((author) =>
					author.name.toLowerCase().includes(search.toLowerCase().trim())
				);
				return sortReverse ? result : result.reverse();
			}
		};

		return (
			<div>
				<h2>Authors</h2>
				<input
					type="search"
					placeholder="search authors"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button onClick={toggleReverse}>reverse</button>
				{getDataToDisplay().map((author) => {
					return (
						<Author
							name={author.name}
							numberOfPosts={author.count}
							id={author.id}
							key={author.id}
							onClick={() => setAuthor(author.id)}
						/>
					);
				})}
			</div>
		);
	};

export default AuthorsList;
