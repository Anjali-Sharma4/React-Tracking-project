import axios from 'axios';
const API_URL = 'http://localhost:8000';
export default class LoginService{
    // constructor(){}
    login(user){
        const url = `${API_URL}/authrestapi/loginapi/`;
        return axios.post(url,user);
    }
     forget(user){
        const url = `${API_URL}/authrestapi/password-reset-email/`;
        return axios.post(url,user);
    }
}
