import axios from "axios";


export const register = async (user) => {
    const res = await axios.post(`http://localhost:8080/api/user/register`,user)
    return res.data;
}

export const login = async (user) => {
    const res = await axios.post(`http://localhost:8080/api/user/login`,user)
    return res.data;
}