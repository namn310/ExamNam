import {
  get,
  // eslint-disable-next-line no-unused-vars
  postAdmin,
  // eslint-disable-next-line no-unused-vars
  postStudent,
  postNotNeedToken,
  delAdmin,
  putStudent,
  putAdmin
} from '../utils/request'

export const getUserList = async (page, role) => {
  const result = await get(`users?page=${page}&role=${role}`)
  return result
}
export const createUser = async (option) => {
  const result = await postNotNeedToken('users/create', option)
  return result
}
// gửi mã OTP để active đăng ký người dùng
export const sendOTPRegist = async (option) => {
  const result = await postNotNeedToken('users/sendOTP', option)
  return result
}
// active tài khoản nếu tài khoản đã đăng ký mà chưa active
export const activeAccount = async (option) => {
  const result = await postNotNeedToken('users/activeAccount', option)
  return result
}
export const deleteUser = async (id) => {
  const result = await delAdmin(`users/delete/${id}`)
  return result
}
// update email
export const updateEmailUser = async (id, option) => {
  const result = await putStudent(`users/updateEmail/${id}`, option)
  return result
}

export const updateUser = async (id, option) => {
  const result = await putStudent(`users/update/${id}`, option)
  return result
}
export const getUserDetail = async (id) => {
  const result = await get(`users/detail/${id}`)
  return result
}
export const Login = async (option) => {
  const result = await postNotNeedToken(`users/login`, option)
  return result
}
export const forgotPasswordView = async (option) => {
  const result = await postNotNeedToken(`users/forgot-password`, option)
  return result
}
export const resetPassword = async (option) => {
  const result = await putStudent(`users/reset-password`, option)
  return result
}
export const resetPasswordForgot = async (option) => {
  const result = await putStudent(`users/reset-passwordForgot`, option)
  return result
}
// changePassAdmin
export const changePassAdmin = async (id, option) => {
  const result = await putAdmin(`usersAdmin/update/${id}`, option)
  return result
}
// tổng số học sinh
export const getTotalStudent = async () => {
  const result = await get(`TotalStudent`)
  return result
}
