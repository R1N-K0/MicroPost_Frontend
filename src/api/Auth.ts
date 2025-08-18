import axios from "axios";

const api = process.env.REACT_APP_API_URL

export const  sign_in = async(user_id: string, pass: string) => {
    console.log(pass)
    const url = `${api}/auth`
    const data = {
        name: user_id,
        password: pass
    }
    const res = await axios.post(url, data)
    return res.data
}
