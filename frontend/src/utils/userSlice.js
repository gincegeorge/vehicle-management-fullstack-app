import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        name: null
    },
    reducers: {
        checkCookie: (state, action) => {
            state.isLoggedIn = action.payload
        }
    }
})

export const { checkCookie } = userSlice.actions

export default userSlice.reducer