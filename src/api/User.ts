import axios from "axios"

export const getUser = async(user_id: number, token: string) => {
    const api = process.env.REACT_APP_API_URL
    const url = `${api}/user/${user_id}?token=${token}`
    const res = await axios.get(url)
    
    return res.data;
}