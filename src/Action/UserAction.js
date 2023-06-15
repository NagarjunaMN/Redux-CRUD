import { createAsyncThunk } from "@reduxjs/toolkit";
import UserApi from "../API/UserApi";

// createAsyncThunk(actionConst, callback)

// read
export const readUser = createAsyncThunk("users/retrive", async () => {
    const res = await UserApi.getAll()
    // console.log('all users =', res.data)
    return res.data.users
})
// create
export const createUser = createAsyncThunk("users/create", async (user) => {

})

// update
export const updateUser = createAsyncThunk("users/update", async ({ user, id }) => {

})

// delete
export const deleteUser = createAsyncThunk("users/delete", async ({ id }) => {

})