import { get, postStudent } from '../utils/request'

export const getCommentsList = async (id) => {
  const result = await get(`comments/${id}`)
  return result
}

export const getChildCommentsList = async (id) => {
  const result = await get(`child-comments/${id}`)
  return result
}

export const createComment = async (option) => {
  const result = await postStudent('comments/create', option)
  return result
}
