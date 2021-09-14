import React from "react";
import "./Author.css";

export interface AuthorProps {
	name: string;
	numberOfPosts: number;
}

const Author: React.FC<AuthorProps> = ({ name, numberOfPosts }) => {
	return (
		<div className="Author">
			{name} ({numberOfPosts})
			<br />
		</div>
	);
};

export default Author;
