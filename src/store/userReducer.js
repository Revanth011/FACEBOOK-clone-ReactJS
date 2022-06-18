import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
export const userSlice = createSlice({
    name: "user",
    initialState: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
    reducers: {
        addUser: (state, action) => {
            switch (action.payload.type) {
                case "LOGIN":
                    return { ...action.payload.userProfile, token: action.payload.token }
                default:
                    return state = null
            }
        }
    }
});
export const { addUser } = userSlice.actions;
export default userSlice.reducer;
