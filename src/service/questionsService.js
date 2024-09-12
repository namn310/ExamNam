import { get, put, post, del } from '../utils/request'

export const getQuestionList = async () => {
  const result = await get(`questions`)
  return result
}
export const getUserCreate = async () => {
  const result = await get('questions/userCreate')
  return result
}
export const DeleteQues = async (id) => {
  const result = await del(`questions/delete/${id}`)
  return result
}
export const PostData = async (option) => {
  const result = await post('questions/create', option)
  return result
}
export const PutData = async (id, option) => {
  const result = await put(`questions/update/${id}`, option)
  return result
}
export const GetDetail = async (id) => {
  const result = await get(`questions/detail/${id}`)
  return result
}
export const questionsPage = async (page) => {
  const result = await get(`questions?page=${page}`);
  return result
}
