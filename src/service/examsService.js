import { get, patch, post, put } from "../utils/request";

export const getExamList = async () => {
    const result = await get(`exams`);
    return result;
}


export const getExamDetail = async (id) => {
    const result = await get(`exams/detail/${id}`);
    return result;
}

export const EditExam = async (id, option) => {
    const result = put(`exams/update/${id}`, option)
    return result;
}