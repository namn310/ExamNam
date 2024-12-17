// eslint-disable-next-line no-unused-vars
import { get, delAdmin, postAdmin, putAdmin } from '../utils/request'
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
export const getClassList = async (page) => {
  const result = await get(`class?page=${page}`)
  return result
}
export const getAllClass = async () => {
  const result = await get(`class/getAll`)
  return result
}
export const createClass = async (option) => {
  const result = await postAdmin('class/create', option)
  return result
}
export const deleteClass = async (id) => {
  const result = await delAdmin(`class/delete/${id}`)
  return result
}
export const updateClass = async (id, option) => {
  const result = await putAdmin(`class/update/${id}`, option)
  return result
}
