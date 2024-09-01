import { get, patch, post } from "../utils/request";

export const getExamList = async () => {
    const result = await get(`exams`);
    return result;
}