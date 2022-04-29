import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../reducers/rootReducers";

export default configureStore({
  reducer: rootReducer,
});
