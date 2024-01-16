import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, getUserStart, getUserSuccess, getUserFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, updateUserStart, updateUserSuccess, updateUserFailure } from "./userRedux";
import { getProductFailure, getProductStart, getProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess, addProductFailure, addProductStart, addProductSuccess, } from "./productRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        const TOKEN = JSON.parse(
            JSON.parse(localStorage.getItem("persist:root"))?.user
        )?.currentUser?.accessToken;
            console.log(TOKEN);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

//USERS
export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await publicRequest.get("/users");
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailure());
    }
};

export const deleteUsers = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        //const res = await userRequest.delete(`/users/${id}`);
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};

export const updateUsers = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
        //const res = await userRequest.put(`/users/${id}`);
        dispatch(updateUserSuccess({ id, user }));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};

//PRODUCTS
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        //const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        // update
        dispatch(updateProductSuccess({ id, product }));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post("/products", product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
};
