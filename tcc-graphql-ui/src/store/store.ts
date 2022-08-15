import { configureStore } from "@reduxjs/toolkit";
import details from "./detailsSlice";
import list from "./listSlice";

export const store = configureStore({
	reducer: {
		details,
		list,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
