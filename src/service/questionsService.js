import { get, delAdmin } from '../utils/request'
import axios from 'axios'
import Cookies from 'js-cookie'
const tokenAdmin = Cookies.get('tokenAdmin')
export const getQuestionList = async () => {
  const result = await get(`questions`)
  return result
}
// lấy danh sách câu hỏi theo danh mục
export const getQuestionListByCategory = async (idCat, page) => {
  const result = await get(`questions?category=${idCat}&page=${page}`)
  return result
}
export const getUserCreate = async () => {
  const result = await get('questions/userCreate')
  return result
}
export const getImageAnswer = async (id) => {
  const result = await get(`questions/imageAnswer/${id}`)
  return result
}
export const DeleteQues = async (id) => {
  const result = await delAdmin(`questions/delete/${id}`)
  return result
}
export const PostData = async (option) => {
  const result = await axios.post('http://localhost:8080/questions/create', option, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${tokenAdmin}`
    }
  })
  return result
}
export const PutData = async (id, option) => {
  // const result = await put(`questions/update/${id}`, option)
  // return result
  const result = await axios.post(`http://localhost:8080/questions/update/${id}`, option, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${tokenAdmin}`
    }
  })
  return result
}
export const GetDetail = async (id) => {
  const result = await get(`questions/detail/${id}`)
  return result
}
export const questionsPage = async (category, page) => {
  const result = await get(`questions?category=${category}&page=${page}`)
  return result
}
