import { get, del, post, put } from "../utils/request";

export const getExamList = async (page) => {
    const result = await get(`exams?page=${page}`);
    return result;
}

export const getCategoryExamList = async () => {
    const result = await get(`category-exam`);
    return result;
}

export const getCategoryExamDetail = async (id) => {
    const result = await get(`category-exam/${id}`);
    return result;
}

export const getQuestionExam = async (id) => {
    const result = await get(`exams/questions-exams/${id}`);
    return result;
}

export const getQuestionCategory = async (id) => {
    const result = await get(`category-question/${id}`);
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

export const createExam = async (option) => {
    const result = await post("exams/create",option);
    return result;
}

export const deleteExam = async (id) => {
    const result = await del(`exams/delete/${id}`);
    return result;
}