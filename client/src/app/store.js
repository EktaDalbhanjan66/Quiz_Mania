import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "../features/Loader/loaderSlice";
import userReducer from "../features/User/useSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    loader: loaderReducer,
  },
});
