import { rest } from "msw";
import { setupServer } from "msw/node";
import { config } from "../app/config";
import {
	fireEvent,
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import RegisterView from "../components/RegisterView/RegisterView";
import { Provider } from "react-redux";
import { RootState, store } from "../store/store";

let tokenRequestSuccessfull = true;
const mockedToken = "mockedToken";

const server = setupServer(
	rest.post(config.url.register, (req, res, ctx) => {
		if (tokenRequestSuccessfull) {
			return res(
				ctx.json({
					data: {
						sl_token: mockedToken,
					},
				})
			);
		} else {
			return res(ctx.status(500));
		}
	})
);

describe("Login", () => {
	beforeAll(() => {
		server.listen();
	});

	beforeEach(() => {
		render(
			<Provider store={store}>
				<RegisterView />
			</Provider>
		);
	});

	afterAll(() => {
		server.close();
	});

	const fillForm = () => {
		const nameInput = screen.getByPlaceholderText(/name/);
		const emailInput = screen.getByPlaceholderText(/email/);
		const submitButton = screen.getByText(/Enter/);

		fireEvent.change(nameInput, { target: { value: "Foo Bar" } });
		fireEvent.change(emailInput, { target: { value: "foo@bar.pl" } });
		fireEvent.click(submitButton);
	};

	it("should get token on submit", async () => {
		await fillForm();

		await waitForElementToBeRemoved(screen.getByText(/loading/));
		expect((store.getState() as RootState).token.value).toBe(mockedToken);
	});

	it("should display error message when request fails and show submit button again", async () => {
		tokenRequestSuccessfull = false;
		fillForm();

		await waitForElementToBeRemoved(screen.getByText(/loading/));

		expect(screen.getByText(/Error occurred/i)).toBeInTheDocument();
		expect(screen.getByText(/Enter/)).toBeInTheDocument();
	});

	it("should not display error message when request is in progress", async () => {
		tokenRequestSuccessfull = false;
		fillForm();
		await waitForElementToBeRemoved(screen.getByText(/loading/));
		tokenRequestSuccessfull = true;
		fillForm();

		await waitFor(() => {
			screen.getByText(/loading/);
		});

		expect(screen.queryByText(/Error occurred/i)).toBe(null);
	});
});
