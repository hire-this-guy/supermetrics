import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenSlice";
import postsReducer from "./postsSlice";

export const store = configureStore({
	reducer: {
		token: tokenReducer,
		posts: postsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
