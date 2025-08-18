import axios, { Axios } from "axios"
import { UserData } from "../types/UserData"

type Edit = {
    name: string
}

const api = process.env.REACT_APP_API_URL

export const getUser = async(user_id: number, token: string): Promise<UserData> => {

    const url = `${api}/user/${user_id}?token=${token}`
    const res = await axios.get(url)
    
    return res.data;
}


export const sign_up = async(user_id: string,email: string ,pass: string) => {
    const url = `${api}/user`
    const data = {
        "name": user_id,
        "email": email,
        "password": pass
    }

   try {
        const res = await axios.post(url, data)
        return res.data
   } catch (error: any) {
        if(axios.isAxiosError(error)){
            if(error.response){
                console.error(error.response.data)
                throw error.response.data
            } else{
                throw error 
            }
        }

        throw error
   }
}

export const updateUser = async(token: string, user_id: number, data: Edit): Promise<UserData> => {
      const url = `${api}/user/${user_id}?token=${token}`
      const res = await axios.put(url, data)
      return res.data;
}