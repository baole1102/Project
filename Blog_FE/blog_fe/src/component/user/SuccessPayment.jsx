import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SuccessPayment() {
    const native = useNavigate();
    const { id } = useParams();
    const [resultPayment, setResultPayment] = useState();
    const token = localStorage.getItem("token")
    useEffect(() => {
        const setPaymentOk = async () => {
            const res = await axios.get(`http://localhost:8080/infor_payment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setResultPayment(res.data);
        }
        setPaymentOk();
        native("/")
        toast(`Thanh toán thành công! \n Vui lòng đăng nhập lại`);
        localStorage.clear();
    }, []);
}