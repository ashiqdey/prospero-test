import { createSlice } from "@reduxjs/toolkit";

const initialState = {}


export const studentSlice = createSlice({
    name: "students",
    initialState: { value: initialState },
    reducers: {
        setStudentPage: (state, action) => {
            const { page, data } = action.payload;

            state.value = {
                ...state.value,
                [page]: data,
            };
        },

        clearStudentPages: (state) => {
            state.value = {};
        },

    },
});

export const {
    setStudentPage,
    clearStudentPages,
} = studentSlice.actions;

export default studentSlice.reducer;