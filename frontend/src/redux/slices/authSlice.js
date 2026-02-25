import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

//it stores token, role, userId, isAuthenticated
const token = localStorage.getItem('token');

let initialState = {
    token: token || null,
    role: null,
    userId: null,
    isAuthenticated: false,
}

if(token) {
    const decoded = jwtDecode(token);
    initialState.role = decoded.role,
    initialState.userId = decoded._id,
    initialState.isAuthenticated = true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            const token = action.payload;
            const decoded = jwtDecode(token);

            state.token = token,
            state.role = decoded.role;
            state.userId = decoded._id;
            state.isAuthenticated = true

            localStorage.setItem('token', token)
        },

        logout: (state) => {
            logout.token = null;
            state.role = null;
            state.userId = null;
            state.isAuthenticated = false;
            
            localStorage.removeItem('token')

        }
    }
})

export const { loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;