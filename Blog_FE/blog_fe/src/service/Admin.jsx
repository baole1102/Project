import axios from "axios";

export async function getAllBlogByAdmin(page, id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/admin/search?page=${page}&id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function addBlogByAdmin(blog) {
    const token = localStorage.getItem("token")
    const res = await axios.post(`http://localhost:8080/api/admin/addBlog`, blog, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function editBlogByAdmin(blog) {
    const token = localStorage.getItem("token")
    const res = await axios.patch(`http://localhost:8080/api/admin/editBlog`, blog, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function deleteBlogByAdmin(blog) {
    const token = localStorage.getItem("token")
    const res = await axios.delete(`http://localhost:8080/api/admin/delete/${blog.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getAllProductByAdmin(page, name) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/admin/manageProduct?page=${page}&name=${name}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function addProductByAdmin(product) {
    const token = localStorage.getItem("token")
    const res = await axios.post(`http://localhost:8080/api/admin/addProduct`, product, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function editProductByAdmin(product) {
    const token = localStorage.getItem("token")
    const res = await axios.patch(`http://localhost:8080/api/admin/editProduct`, product, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export const getProductByAdmin = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/product/${id}`)
    return res.data;
}

export async function deleteProductByAdmin(product) {
    const token = localStorage.getItem("token")
    const res = await axios.delete(`http://localhost:8080/api/admin/deleteProduct/${product.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getAllAccountByAdmin(page, name) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/admin/getAllAccount?page=${page}&name=${name}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function deleteAccountByAdmin(account) {
    const token = localStorage.getItem("token")
    const res = await axios.delete(`http://localhost:8080/api/admin/deleteAccount/${account.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getAllOrderByAdmin(page) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/admin/listOrder?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function confirmOrderByAdmin(createOrder,idUser) {
    const data ={createOrder,idUser}
    const token = localStorage.getItem("token")
    const res = await axios.post(`http://localhost:8080/api/admin/confirmOrder`,data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getDetailsOrderByAdmin(orderDate, id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/admin/detailsOrder?orderDate=${orderDate}&idUser=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getTotalPriceOrderByAdmin(orderDate, id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/admin/totalOrder?orderDate=${orderDate}&idUser=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function getUserByAdmin(id) {
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/admin/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}