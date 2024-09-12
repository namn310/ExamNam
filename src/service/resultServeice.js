import { get, post } from "@/utils/request";


export const createResult = async (option) => {
    const result = await post("result/create",option);
    return result;
}

export const getResultDetail = async (id) => {
    const result = await get(`result/detail/${id}`);
    return result;
}
