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
		<div className="Register">
			<form className="Register__form" onSubmit={submit}>
				<h3 className="Register__header">Please register</h3>
				{isTokenRejected && <div>Error occurred, please try again</div>}
				<input
					className="Register__input"
					type="text"
					placeholder="name"
					name="name"
					ref={name}
					required
				/>
				<input
					className="Register__input"
					type="email"
					placeholder="email"
					name="email"
					ref={email}
					required
				/>
				{!isTokenPending && (
					<button className="Register__button" type="submit">
						Enter
					</button>
				)}
				{isTokenPending && <div>loading...</div>}
			</form>
		</div>
	);
};

export default RegisterView;
