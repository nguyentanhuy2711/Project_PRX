import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storage-keys';

// createAsyncThunk cái này sử dụng cho login và register
export const register = createAsyncThunk(
    'users/register',
    async (payload) => {
        //call api to register
        return data;
    }
)

// createAsyncThunk cái này sử dụng cho login và register
export const login = createAsyncThunk(
    'users/login',
    async (payload) => {
        try {
            const response = await authApi.login(payload);
            localStorage.setItem(StorageKeys.access, response.data.access);
            localStorage.setItem(StorageKeys.refresh, response.data.refresh);
            const username = JSON.parse(response.config.data).username
            const responseUser = await authApi.getUser({ username: username })
            const user = {...responseUser.data[0]}
            const responseProfile = await authApi.getProfile({user: user.id})
            const profile = {...responseProfile.data}
            const data = {
                ...user,
                ...profile,
            }
            localStorage.setItem(StorageKeys.user, JSON.stringify(data));
            return data
        } catch (error) {
            console.log(error)
            return error.message;
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        settings: {},
    },
    reducers: {
        logout(state) {
            //clear local storage
            state.current = {}
            localStorage.removeItem(StorageKeys.access)
            localStorage.removeItem(StorageKeys.refresh)
            localStorage.removeItem(StorageKeys.user)
        }
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;
        },

        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        }
    }
})

const { actions, reducer } = userSlice
export const {logout} = actions
export default reducer
