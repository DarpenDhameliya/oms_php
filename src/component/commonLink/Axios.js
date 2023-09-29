import axios from 'axios';
// const instance = axios.create({baseURL: 'http://omapi.softstorm.in'});
const instance = axios.create({baseURL: 'http://192.168.0.97/laravelproject/exampleapi'});
// http://192.168.0.97/laravelproject/exampleapi/api/auth/amazoneread
// http://192.168.0.97/laravelproject/exampleapi/api/auth/amount_receive_data
export default instance
