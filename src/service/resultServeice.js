import { get, post } from "@/utils/request";


export const createResult = async (option) => {
    const result = await post("result/create",option);
    return result;
}

export const getResultDetail = async (id) => {
    const result = await get(`result/detail/${id}`);
    return result;
}
export const getReviewResult = async (id) => {
    const result = await get(`result/review/${id}`);
    return result;
}
export const getUserListResult = async (id) => {
    const result = await get(`UserlistResult/${id}`);
    return result;
}

export const getUserListResultByPage = async (id,page) => {
    const result = await get(`UserlistResult/${id}?page=${page}`);
    return result;
}

