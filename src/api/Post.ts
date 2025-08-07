import axios from "axios";

export const getList = async(token: string) => {
    const api = process.env.REACT_APP_API_URL
    const url = `${api}/post?token=${token}&records=10`;
    const res = await axios.get(url);

    return res.data
}

export const post = async(token: string, message: string) => {
    const data =  {
        message: message
    }
    const url = `http://localhost:3001/post?token=${token}`
    const res = await axios.post(url, data)
}