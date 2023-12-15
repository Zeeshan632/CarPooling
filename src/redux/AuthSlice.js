import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import Toast from 'react-native-toast-message'
import BaseUrls from "../BaseUrls";

export const login = createAsyncThunk(
    "auth/login",
    async(form) => {
        return auth()
        .signInWithEmailAndPassword(form.email, form.password)
        .then(async({user}) => {
            return await firebase
            .app()
            .database(BaseUrls.fb_realtime_database_endpoint)
            .ref(`/users/${user.uid}`)
            .once('value')
            .then(snapshot => {
                if(snapshot.exists()){
                    console.log("@#@#@#@#@#^&&&&&&^^^^^^^^--->>    ", snapshot.val())
                    return snapshot.val()
                }else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Your data does not exist on the database' 
                    })
                }
            })
            .catch(error => {
                Toast.show({
                    type: 'error',
                    text1: 'Oops',
                    text2: `${error.message} 👋`
                })

                return error;
            })
        })
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
            state.userLoggedIn = true
            state.token = action.payload?.userId
            state.data = action.payload
            
        }).addCase(login.rejected, (state, action) => {
            state.loading = false

        })
    }
})

export const {logout, updateUserData, makeLoadingFalse, setPackageBought, signup} = AuthSlice.actions;
export default AuthSlice.reducer;