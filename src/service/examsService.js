import { get, delAdmin, postAdmin, putAdmin } from '../utils/request'

export const getExamList = async (page) => {
  const result = await get(`exams?page=${page}`)
  return result
}

export const getCategoryExamList = async () => {
  const result = await get(`category-exam`)
  return result
}

export const getCategoryExamDetail = async (id) => {
  const result = await get(`category-exam/${id}`)
  return result
}

export const getQuestionExam = async (id) => {
  const result = await get(`exams/questions-exams/${id}`)
  return result
}
// lấy câu hỏi để hiển thị ra đề thi, không có dữ liệu đáp án
export const getQuestionToDoExam = async (id) => {
  const result = await get(`exams/questions-todo-exams/${id}`)
  return result
}
export const getQuestionCategory = async (id) => {
  const result = await get(`category-question/${id}`)
  return result
}

export const getExamDetail = async (id) => {
  const result = await get(`exams/detail/${id}`)
  return result
}
export const getExamByCategory = async (id) => {
  const result = await get(`exam/category/${id}`)
  return result
}
export const EditExam = async (id, option) => {
  const result = putAdmin(`exams/update/${id}`, option)
  return result
}

export const createExam = async (option) => {
  const result = await postAdmin('exams/create', option)
  return result
}

export const deleteExam = async (id) => {
  const result = await delAdmin(`exams/delete/${id}`)
  return result
}
// lấy số lượng người làm sai câu hỏi
export const getCountDoWrong = async (id) => {
  const result = await get(`exams/count_do_wrong/${id}`)
  return result
}
