import axios from 'axios'

const httpAuth = axios.create({
  baseURL: 'https://be7e-27-72-62-196.ngrok-free.app/api/v1/',
  headers: {
    //'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    "ngrok-skip-browser-warning": "1",
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // 'Access-Control-Allow-Headers': ''
    Accept: 'application/json'
    // Authorization: 'Bearer ' + localStorage.getItem('token')
  }
})
/*
httpAuth.interceptors.request.use((config) => {
  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')

  return config
})

httpAuth.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    let code = parseInt(error.response && error.response.status)

    console.log(code);
  }
)
*/
export default httpAuth
