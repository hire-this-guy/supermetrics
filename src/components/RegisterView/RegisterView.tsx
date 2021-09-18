import React, { useRef } from "react";
import "./RegisterView.css";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../store/tokenSlice";
import { RootState } from "../../store/store";

const RegisterView: React.FC = () => {
	const name = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);

	const dispatch = useDispatch();
	const isTokenPending = useSelector(
		(state: RootState) => state.token.status === "pending"
	);

	// TODO remove the message when changes were made to the form
	const isTokenRejected = useSelector(
		(state: RootState) => state.token.status === "rejected"
	);

	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		dispatch(
			getToken({
				name: name.current?.value.trim() ?? "",
				email: email.current?.value.trim() ?? "",
			})
		);
	};

	return (
		<div className="Login">
			<form className="Login__form" onSubmit={submit}>
				{isTokenRejected && <div>Error occurred, please try again</div>}
				<input
					className="Login__input"
					type="text"
					placeholder="name"
					name="name"
					ref={name}
					required
				/>
				<input
					className="Login__input"
					type="email"
					placeholder="email"
					name="email"
					ref={email}
					required
				/>
				{!isTokenPending && (
					<button className="Login__button" type="submit">
						Enter
					</button>
				)}
				{isTokenPending && <div>loading...</div>}
			</form>
		</div>
	);
};

export default RegisterView;
