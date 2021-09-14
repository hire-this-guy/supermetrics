import React, { useRef } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { getToken } from "../../store/tokenSlice";

const Login: React.FC = () => {
	const name = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);

	const dispatch = useDispatch();

	const submit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// TODO error handling
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
				<button className="Login__button" type="submit">
					Enter
				</button>
			</form>
		</div>
	);
};

export default Login;
