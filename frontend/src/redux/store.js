import { configureStore } from "@reduxjs/toolkit";

// reducers
import students from "./students";

const store = configureStore({
    reducer: {
        students
    },
});

export default store;