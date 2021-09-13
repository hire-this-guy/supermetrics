import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token";
import { postsApi } from "../services/postsApi";

export const store = configureStore({
	reducer: {
		token: tokenReducer,
		[postsApi.reducerPath]: postsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
