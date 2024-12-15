// eslint-disable-next-line no-unused-vars
import { get, delAdmin, postAdmin, putAdmin } from '../utils/request'

// lấy danh sách học sinh làm bài kiểm tra
export const IRTGet_user_do_exam = async (id) => {
  const result = await get(`IRT-get-user-do-exam/${id}`)
  return result
}
// lấy dữ liệu kết quả làm bài của học sinh đó
export const IRTGet_result_detail_by_student = async (idUser, idExam, $idResult) => {
  const result = await get(
    `IRT-get-result-by-user/userId=${idUser}&examId=${idExam}&resultId=${$idResult}`
  )
  return result
}
// lấy dữ liệu độ khó câu hỏi
export const getIRT_diffuculity = async (idExam) => {
  const result = await get(`IRT-make-Data/ExamId=${idExam}`)
  return result
}
