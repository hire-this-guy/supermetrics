import React from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import PostsView from "./components/PostsView/PostsView";

const App: React.FC = () => {
	const hasToken = useSelector(
		(state: RootState) => state.token.status === "fulfilled"
	);

	return (
		<div className="App">
			{!hasToken && <Login />}
			{hasToken && <PostsView />}
		</div>
	);
};

export default App;
