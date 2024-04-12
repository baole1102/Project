import axios from "axios";

export const getAllProduct = async (page,idType) => {
    const res = await axios.get(`http://localhost:8080/api/product?page=${page}&idType=${idType}`)
    return res.data;
}

export const getProductById = async (id) => {
    const res = await axios.get(`http://localhost:8080/api/product/detailProduct/${id}`)
    return res.data;
}
export const getProductRelated = async () => {
    const res = await axios.get(`http://localhost:8080/api/product/related`)
    return res.data;
}

export const getBlogForProduct = async () => {
    const res = await axios.get("http://localhost:8080/api/product/forProduct")
    return res.data;
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`http://localhost:8080/api/product/typeProduct`)
    return res.data;
}