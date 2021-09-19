import React from "react";
import "./Author.css";
import { AuthorTestIds } from "./Author.testIds";

export interface AuthorProps {
	name: string;
	id: string;
	numberOfPosts: number;
	onClick: React.MouseEventHandler;
	isActive: boolean;
}

const Author: React.FC<AuthorProps> = ({ ...props }) => {
	return (
		<div
			className={`Author ${props.isActive ? "Author--active" : ""}`}
			onClick={props.onClick}
			data-testid={AuthorTestIds.wrapper}
		>
			{props.name} ({props.numberOfPosts})
		</div>
	);
};

export default Author;
