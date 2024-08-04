import axios from 'axios';

const BASE_URL = 'https://baotrinh.pythonanywhere.com';
// const BASE_URL = 'http://127.0.0.1:8000';

export const endpoints = {
    'current_user': `/users/current-user/`, 
    'users' : `/users/`,
    'login': `/o/token/`,     
};


const APIs = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
  },
});

//Xác thực người dùng 
export const authApi = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
  }

export default APIs;