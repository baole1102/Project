import axios from "axios";

export async function addToCart(idProduct, idUser) {
    const data = { idProduct, idUser }
    const token = localStorage.getItem("token")
    const res = await axios.post(`http://localhost:8080/api/cart`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getListCart(idUser) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/cart/${idUser}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function minus(idProduct, idUser) {
    const data = { idProduct, idUser }
    const token = localStorage.getItem("token")
    const res = await axios.post(`http://localhost:8080/api/cart/minus`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}
export async function add(idProduct, idUser) {
    const data = { idProduct, idUser }
    const token = localStorage.getItem("token")
    const res = await axios.post(`http://localhost:8080/api/cart/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}
export async function getTotalPrice(idUser) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/cart/totalPrice/${idUser}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getPaymentCart(idUser, totalPrice) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/paymentCart?idAccount=${idUser}&totalPrice=${totalPrice}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getCountCart(idUser) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/cart/count/${idUser}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function deleteCart(idProduct, idUser) {
    const token = localStorage.getItem("token")
    const res = await axios.delete(`http://localhost:8080/api/cart/deleteCart?idProduct=${idProduct}&idUser=${idUser}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}