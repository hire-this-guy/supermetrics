import React from "react";
import "./App.css";
import RegisterView from "./components/RegisterView/RegisterView";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import PostsView from "./components/PostsView/PostsView";

const App: React.FC = () => {
	const hasToken = useSelector(
		(state: RootState) => state.token.status === "fulfilled"
	);

	return (
		<div className="App">
			{!hasToken && <RegisterView />}
			{hasToken && <PostsView />}
		</div>
	);
};

export default App;
