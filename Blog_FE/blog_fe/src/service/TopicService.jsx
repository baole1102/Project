import axios from "axios";

export const getAllTopic = async (idCate) => {
    const res = await axios.get(`http://localhost:8080/api/topic/${idCate}`)
    return res.data;
}