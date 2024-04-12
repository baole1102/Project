import axios from "axios";

export async function getAllBlog(page,search){
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/admin/manageBlog?page=${page}&id=${search}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export const getPageBlog = async (page) => {
    const res = await axios.get(`http://localhost:8080/api/blog?page=${page}`)
    return res.data;
}

export const getBlogsMaxView = async () => {
    const res = await axios.get("http://localhost:8080/api/blog/maxBlog")
    return res.data;
}

export const getBlogById = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/blog/detail/${id}`)
    return res.data;
}

export const getBlogHighView = async () => {
    const res = await axios.get("http://localhost:8080/api/blog/highView")
    return res.data;
}

export const getListBlogCurrent = async () => {
    const res = await axios.get("http://localhost:8080/api/blog/current")
    return res.data;
}

export const findBlogByTopic = async (page,id) => {
    const res = await axios.get(`http://localhost:8080/api/blog/findBlog?page=${page}&id=${id}`)
    return res.data;
}

