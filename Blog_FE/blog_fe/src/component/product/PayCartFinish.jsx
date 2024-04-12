import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SuccessPayment() {
    const native = useNavigate();
    const { id } = useParams();
    const [resultPayment, setResultPayment] = useState("");
    const token = localStorage.getItem("token")
    useEffect(() => {
        const setPaymentOk = async () => {
            const searchParams = new URLSearchParams(window.location.search);
            const status = searchParams.get('vnp_TransactionStatus');
            const res = await axios.get(`http://localhost:8080/infor_paymentCart/${id}`, {
                params: {
                    status: status
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res.data);
            if (res.data == "YES") {
                native(`/product`)
                toast(`Thanh toán thành công`)
            } else if (res.data == "NO") {
                native(`/product`)
                toast(`Thanh toán thất bại`)
            }
        }
        setPaymentOk();
    }, [resultPayment]);
}