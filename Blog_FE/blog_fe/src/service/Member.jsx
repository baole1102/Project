import axios from "axios";

export async function getAllBlogByMember (page, id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/member/manageBlog?page=${page}&idUser=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}