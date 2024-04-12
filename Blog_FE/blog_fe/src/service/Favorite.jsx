import axios from "axios";

export async function getListFavorite (page,id){
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/favorite?page=${page}&idUser=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}


export async function getCountAndAddFavorite (idBlog,idUser){
    const data = {idBlog ,idUser}
    const token = localStorage.getItem("token")
    const res = await axios.post(`http://localhost:8080/api/favorite/count`,data,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function checkCount (idUser){
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/favorite/checkCount/${idUser}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}

export async function checkFavoriteCount (idUser,idBlog){
    const token = localStorage.getItem("token")
    const res = await axios.get(`http://localhost:8080/api/favorite/checkFavorite?idUser=${idUser}&idBlog=${idBlog}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return res.data;
}



