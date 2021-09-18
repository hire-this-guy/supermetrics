import { screen } from "@testing-library/react";
import { PostItemTestIds } from "../components/PostItem/PostItem.testIds";
import { AuthorTestIds } from "../components/Author/Author.testIds";

export const getDatesFromPosts = async (): Promise<number[]> => {
	const posts = await screen.findAllByTestId(PostItemTestIds.date);
	return posts.map((dateElement) => {
		const date = dateElement.textContent?.replace(/date: /i, "") ?? "";
		return new Date(date).getTime();
	});
};

export const selectFirstAuthor = async (): Promise<void> => {
	const authors = await screen.findAllByTestId(AuthorTestIds.wrapper);
	authors[0].click();
};
