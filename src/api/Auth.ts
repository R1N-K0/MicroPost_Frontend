import axios from "axios";

export const  sign_in = async(user_id: string, pass: string) => {
    const api = process.env.REACT_APP_API_URL
    console.log(api)
    const url = `${api}/auth?user_id=${user_id}&password=${pass}`
    const res = await axios.get(url)
    return res.data
}