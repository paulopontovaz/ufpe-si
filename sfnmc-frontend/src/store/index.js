import { configureStore } from "@reduxjs/toolkit";
import flightRecommendationReducer from "./flightRecommendationSlice";

export const store = configureStore({
	reducer: {
		flightRecommendation: flightRecommendationReducer,
	},
});
