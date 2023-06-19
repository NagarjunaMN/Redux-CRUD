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
    console.log("action -> ",user)
    const res = await UserApi.create(user)
    return res.data
})

// update
export const updateUser = createAsyncThunk("users/update", async ({ user, id }) => {
    console.log('Updated User =', user, "and ID = ",  id)
    const res = await UserApi.update(user,id)
    return res.data
})

// delete
export const deleteUser = createAsyncThunk("users/delete", async ({ id }) => {
    console.log("delete user id = ", id)
    const res = await UserApi.delete(id)
    return {id}
})