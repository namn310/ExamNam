import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
export const decodeToken = () => {
  const token = Cookies.get('tokenAdmin')
  // console.log(jwtDecode);
  const decode = jwtDecode(token)
  return decode
}
