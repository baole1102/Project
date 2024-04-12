import axios from "axios";

export async function getPayment (idUser,price){
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/payment/createPay?idAccount=${idUser}&price=${price}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}