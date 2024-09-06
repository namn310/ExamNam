import { get, post, del } from "../utils/request";

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