import React from "react";
import "./Author.css";

export interface AuthorProps {
	name: string;
	id: string;
	numberOfPosts: number;
}

const Author: React.FC<AuthorProps> = ({ name, id, numberOfPosts }) => {
	return (
		<div className="Author">
			{name} ({numberOfPosts})
			<br />
		</div>
	);
};

export default Author;
