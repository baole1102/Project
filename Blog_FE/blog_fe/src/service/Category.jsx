import axios from "axios";

export const getAllCategory = async () => {
    const res = await axios.get("http://localhost:8080/api/category")
    return res.data;
}