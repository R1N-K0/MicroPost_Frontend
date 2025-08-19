import axios, { Axios } from "axios"
import { UserData } from "../types/UserData"

const api = process.env.REACT_APP_API_URL

type Edit = {
    name: string,
    img?: string,
    description?: string
}



export const getProfile = async (token: string, user_id: number): Promise<{description: string, img: string}> => {
    const url = `${api}/profile/${user_id}?token=${token}`;
    const res = await axios.get(url);
    return res.data
}

export const updateOrCreateProfile = async(token: string, user_id: number, data: Edit) => {
      const url = `${api}/profile/${user_id}?token=${token}`
      const res = await axios.put(url, data)
      return res.data;
}