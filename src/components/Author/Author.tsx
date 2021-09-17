import React from "react";
import "./Author.css";

export interface AuthorProps {
	name: string;
	id: string;
	numberOfPosts: number;
	onClick: React.MouseEventHandler;
}

const Author: React.FC<AuthorProps> = ({ ...props }) => {
	return (
		<div className="Author" onClick={props.onClick}>
			{props.name} ({props.numberOfPosts})
		</div>
	);
};

export default Author;
