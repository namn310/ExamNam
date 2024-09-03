import { get, post } from "../utils/request";

export const getUserList = async () => {
    const result = await get(`users`);
    return result;
};
export const createUser = async (option) => {
    const result = await post("users/create", option);
    return result;
};