import axios from "axios";

const api = process.env.REACT_APP_API_URL

export const getList = async(token: string, start:number=0, q: string) => {
    const url = `${api}/post?token=${token}&records=10&start=${start}&q=${q}`;
    const res = await axios.get(url);
    return res.data
}

export const getUserPosts = async(token: string, id: number) => {
    const url = `${api}/post/${id}?token=${token}`;
    console.log(url)
    const res = await axios.get(url);

    return res.data
}


export const post = async(token: string, message: string) => {
    const data =  {
        message: message
    }
    const url = `${api}/post?token=${token}`
    const res = await axios.post(url, data)

    return res.data
}

export const deletePost = async(token: string, id: number) => {
    const url = `${api}/post?token=${token}&id=${id}`
    const res = await axios.delete(url)

    return res.data
}