import { get, delAdmin, postAdmin, putAdmin } from '../utils/request'
import axios from 'axios'
//
export const getExamList = async (page, category) => {
  const result = await get(`exams?page=${page}&category=${category}`)
  return result
}
// export const getListExam = async () => {
//   const result = await get(`exams`)
//   return result
// }
// lấy danh sách danh mục không phân trang
export const getCategoryExamList = async () => {
  const result = await get(`category-getAll`)
  return result
}
export const getCategoryExamListByPage = async (page) => {
  const result = await get(`category-exam?page=${page}`)
  return result
}
export const getCategoryExamDetail = async (id) => {
  const result = await get(`category-exam/${id}`)
  return result
}
// lấy tên bài kiểm tra
export const getNameExam = async (id) => {
  const result = await get(`exams/getNameExam/${id}`)
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
// lấy chi tiết bài kiểm tra + comment
export const getExamDetail = async (id) => {
  const result = await get(`exams/detail/${id}`)
  return result
}
// chỉ lấy ra chi tiết bài kiểm tra
export const getDetailExam = async (id) => {
  const result = await get(`exams/Examdetail/${id}`)
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

// tạo mới bài kiểm tra option
export const createExamOption = async (option) => {
  const result = await postAdmin('exams/create-exam-option', option)
  return result
}
// thêm câu hỏi vào bài kiểm tra option
export const AddQuestionIntoExamOption = async (id, option) => {
  const result = await axios.post(
    `http://localhost:8080/exams/AddQuestionIntoExamOption/${id}`,
    option,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return result
}
// xóa câu hỏi trong đề thi
export const DeleteQuestionInExam = async (idQues, idExam) => {
  const result = await delAdmin(`exam/delete_question/idQues=${idQues}&idExam=${idExam}`)
  return result
}
export const deleteExam = async (id) => {
  const result = await delAdmin(`exams/delete/${id}`)
  return result
}
// xóa danh mục
export const deleteCategory = async (id) => {
  const result = await delAdmin(`category/delete/${id}`)
  return result
}
// thêm danh mục
export const createCategory = async (option) => {
  const result = await postAdmin(`categoryExam/create`, option)
  return result
}
// update danh mục
export const updateCategory = async (id, option) => {
  const result = await putAdmin(`category/update/${id}`, option)
  return result
}
// lấy số lượng người làm sai câu hỏi
export const getCountDoWrong = async (id) => {
  const result = await get(`exams/count_do_wrong/${id}`)
  return result
}
// lấy tổng số đề thi
export const getTotalExam = async (id) => {
  const result = await get(`TotalExam/${id}`)
  return result
}
// danh sách đề thi làm nhiều
export const getListExamDoMore = async () => {
  const result = await get(`ListExamDoMore`)
  return result
}
