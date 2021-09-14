import React from "react";
import "./App.css";
import Login from "./components/Login/Login";
import PostsList from "./components/PostsList/PostsList";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

function App() {
	const token = useSelector((state: RootState) => state.token.value);
	return (
		<div className="App">
			{!token && <Login />}
			{token && <PostsList />}
		</div>
	);
}

export default App;
