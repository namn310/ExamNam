import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
export const decodeToken = () => {
  const token = Cookies.get('tokenAdmin')
  if (token) {
    const decode = jwtDecode(token)
    return decode
  } else {
    return null
  }
}
export const decodeTokenStudent = () => {
  const token = Cookies.get('tokenStudent')
  if (token) {
    const decode = jwtDecode(token)
    return decode
  } else {
    return null
  }
}
