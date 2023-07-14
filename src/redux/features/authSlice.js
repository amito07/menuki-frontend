import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: {
        isAuth: false,
        user: {},
        accessToken: '',
    },
};

export const auth = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logIn: (state, action) => {
            console.log(action.payload);
            return {
                value: {
                    isAuth: true,
                    user: action.payload?.user,
                    accessToken: action.payload?.access_token,
                },
            };
        },
        logOut: () => {
            return initialState;
        },
    },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
