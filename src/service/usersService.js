import { get, post, del, put } from "../utils/request";

export const getUserList = async () => {
    const result = await get(`users`);
    return result;
};
export const createUser = async (option) => {
    const result = await post("users/create", option);
    return result;
};
export const deleteUser = async (id) => {
    const result = await del(`users/delete/${id}`);
    return result;
}
export const updateUser = async (id, option) => {
    const result = await put(`users/update/${id}`, option);
    return result;
}
export const getUserDetail = async (id) => {
    const result = await get(`users/detail/${id}`);
    return result;
}
export const Login = async (option) => {
    const result = await post(`users/login`, option);
    return result;
}
export const forgotPasswordView = async (option) => {
    const result = await post(`users/forgot-password`, option);
    return result;
}
export const resetPassword = async (option) => {
    const result = await post(`users/reset-password`, option);
    return result;
}
// export const checkToken = async () => {
//     const result = await get()
// }