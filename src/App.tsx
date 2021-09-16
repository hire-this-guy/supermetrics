import React from "react";
import "./App.css";
import Login from "./components/Login/Login";
import PostsList from "./components/PostsList/PostsList";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import AuthorsList from "./components/AuthorsList/AuthorsList";

const App: React.FC = () => {
	const hasToken = useSelector(
		(state: RootState) => state.token.status === "fulfilled"
	);
	const hasPosts = useSelector(
		(state: RootState) => state.posts.status === "fulfilled"
	);

	return (
		<div className="App">
			{!hasToken && <Login />}
			{hasToken && <PostsList />}
			{hasPosts && <AuthorsList />}
		</div>
	);
};

export default App;
