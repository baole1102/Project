import axios from "axios";

export async function getUserById(id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/user/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getBlogByUserId(page, id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/user/blog?page=${page}&idUser=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}
export async function getProductHistory(page, id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/user/historyProduct?page=${page}&idUser=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getDetailsOrder(orderDate, id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/user/detailsOrder?orderDate=${orderDate}&idUser=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getTotalPriceOrder(orderDate, id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/user/totalOrder?orderDate=${orderDate}&idUser=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function checkPassword(id, password) {
    const data = {id,password}
    const token = localStorage.getItem("token")
    const res = await axios.post(`http://localhost:8080/api/user/checkPassword`,data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function channgePassword(id, password) {
    const data = {id,password}
    const token = localStorage.getItem("token")
    const res = await axios.post(`http://localhost:8080/api/user/changePassword`,data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}