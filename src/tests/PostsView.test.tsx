import { setupServer } from "msw/node";
import { rest } from "msw";
import { apiBase } from "../app/config";
import { mockedPosts } from "./mocks/mocks";
import {
	fireEvent,
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import PostsView from "../components/PostsView/PostsView";
import "@testing-library/jest-dom/extend-expect";
import { getDatesFromPosts, selectFirstAuthor } from "./utils";
import { PostsListTestIds } from "../components/PostsList/PostsList.testIds";
import { PostItemTestIds } from "../components/PostItem/PostItem.testIds";
import { AuthorTestIds } from "../components/Author/Author.testIds";

describe("Posts view", () => {
	let responded = false;
	const server = setupServer(
		rest.get(`${apiBase}/posts`, (req, res, ctx) => {
			if (responded) {
				return res(
					ctx.json({
						data: {
							posts: [],
						},
					})
				);
			}
			responded = true;
			return res(
				ctx.json({
					data: {
						posts: mockedPosts,
					},
				})
			);
		})
	);

	beforeAll(() => {
		server.listen();
	});

	beforeEach(() => {
		render(
			<Provider store={store}>
				<PostsView />
			</Provider>
		);
	});

	afterAll(() => {
		server.close();
	});

	it("should display authors with posts count alphabetically", async () => {
		await waitForElementToBeRemoved(screen.getByText(/loading/i));
		const authors = screen.queryAllByTestId(AuthorTestIds.wrapper);

		expect(authors[0].textContent).toBe("Ethelene Maggi (3)");
		expect(authors[1].textContent).toBe("Gigi Richter (2)");
	});

	it("should reverse the list when reverse button is pressed", async () => {
		screen.getByTestId("reverseAuthors").click();
		let authors = screen.queryAllByTestId(AuthorTestIds.wrapper);

		expect(authors[0].textContent).toBe("Gigi Richter (2)");
		expect(authors[1].textContent).toBe("Ethelene Maggi (3)");

		screen.getByTestId("reverseAuthors").click();
		authors = screen.queryAllByTestId(AuthorTestIds.wrapper);

		expect(authors[0].textContent).toBe("Ethelene Maggi (3)");
		expect(authors[1].textContent).toBe("Gigi Richter (2)");
	});

	it("should filter authors based on input field", async () => {
		const searchString = "ggi";
		const searchField = await screen.findByPlaceholderText(/search authors/i);
		fireEvent.change(searchField, { target: { value: searchString } });
		const authors = await screen.findAllByTestId(AuthorTestIds.wrapper);

		expect(authors[0].textContent).toBe("Ethelene Maggi (3)");
		expect(authors.length).toBe(1);
	});

	it("should display placeholder when no author was selected", async () => {
		let authorPlaceholder = screen.queryByText(/Please select an author/i);

		expect(authorPlaceholder).not.toBeNull();

		await selectFirstAuthor();
		authorPlaceholder = screen.queryByText(/Please select an author/i);

		expect(authorPlaceholder).toBeNull();
	});

	it("should display posts only from selected user", async () => {
		// TODO find a nicer way write this test
		await selectFirstAuthor();
		const messages = await screen.findAllByTestId(PostItemTestIds.message);
		const text = messages.map((msg) => msg.textContent);

		expect(text[0]).toBe("This is the third post");
		expect(text[1]).toBe("Lorem ipsum post message");
		expect(text[2]).toBe("Another message");
	});

	it("should show newest posts first and toggle sorting with when buttons are pressed", async () => {
		await selectFirstAuthor();
		const newestFirstButton = await screen.findByTestId(
			PostsListTestIds.newestFirst
		);
		const oldestFirstButton = await screen.findByTestId(
			PostsListTestIds.oldestFirst
		);
		let dates = await getDatesFromPosts();

		expect(dates.sort()).toEqual(dates);

		oldestFirstButton.click();
		dates = await getDatesFromPosts();

		expect(dates.sort().reverse()).toEqual(dates);

		newestFirstButton.click();
		dates = await getDatesFromPosts();

		expect(dates.sort()).toEqual(dates);
	});

	it("should filter posts based on input field", async () => {
		await selectFirstAuthor();
		const searchString = "mess";
		const searchField = await screen.findByTestId(PostsListTestIds.search);
		fireEvent.change(searchField, { target: { value: searchString } });
		const messages = await screen.findAllByTestId(PostItemTestIds.message);

		messages.forEach((text) => {
			expect(text.textContent?.includes(searchString) ?? false).toBe(true);
		});
	});
});
