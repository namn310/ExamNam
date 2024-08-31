import { get, patch, post } from "../utils/request";

export const getQuestionList = async () => {
    const result = await get(`questions/read.php`);
    return result;
}