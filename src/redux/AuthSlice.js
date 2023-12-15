import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-toast-message'

export const login = createAsyncThunk(
    "auth/login",
    async(config) => {
        
        return axios(config).then(function (response) {
            if(!response.data.success){
                Toast.show({
                    type: 'error',
                    text1: 'Oops',
                    text2: `${response.data.message} 👋`
                })
            }
            return response.data
            }).catch(function (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Oops',
                    text2: `${error.message} 👋`
                })
                return error
            });
    }
)

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        userLoggedIn: false,
        loading: false,
        data: {},
        packageBought: false,
        token: "",
    },
    reducers: {
        logout(state){
            state.userLoggedIn = false
            state.loading = false
            state.data = {}
            state.token = ""
            state.packageBought = false
        },
        signup(state, action){
            state.userLoggedIn = action.payload.success
            state.token = action.payload.token
            state.data = action.payload.data
        },
        updateUserData(state, action){
            state.data = action.payload
        },
        makeLoadingFalse(state, action){
            state.loading = false
        },
        setPackageBought(state, action){
            state.packageBought = action.payload
        }
    },
    extraReducers(builder){
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
            
        }).addCase(login.fulfilled, (state, action) => {
            
            state.loading = false
            state.userLoggedIn = action.payload.success
            state.token = action.payload.token
            state.data = action.payload.data
            
        }).addCase(login.rejected, (state, action) => {
            state.loading = false

        })
    }
})

export const {logout, updateUserData, makeLoadingFalse, setPackageBought, signup} = AuthSlice.actions;
export default AuthSlice.reducer;