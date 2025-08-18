import { useContext, useState } from "react";
import styled from "styled-components";
import { sign_up } from "../api/User";
import { useNavigate } from "react-router-dom";
import { sign_in } from "../api/Auth";
import { UserContext } from "../providers/UserProvider";


export default function SignUp() {
    const navigate = useNavigate()
    const { setUserInfo} = useContext(UserContext)
    const [userId, setUserId] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");

    
    const onSignUpClick = async() => {
        try {
            await sign_up(userId, email, pass)
            const ret = await sign_in(userId, pass)
            if (ret && ret.token) {
              setUserInfo({
                  id: ret.user_id,
                  token: ret.token,
              })
                navigate("/main")
            }
        } catch (error: any) {
            alert(error.message || JSON.stringify(error))
        }
    }
  
    return (
    <>
        <div className="bg-white w-100 h-full">
        <div className="container flex-row items-center justify-center p-8 rounded-lg shadow-lg  w-[70%] border-1 mx-auto mt-60">
          <div className="text-2xl font-bold mb-6 text-center text-gray-800">
              新規アカウント作成
          </div>
          <div className="mb-4 flex  justify-center items-center space-x-4">
            <label htmlFor="name" className=" block w-32 text-sm font-medium text-gray-900 dark:text-white">ユーザー名</label>
            <input id="name" type="text" value={userId} onChange={(e) => setUserId(e.target.value)}
            className=" px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4 flex  justify-center items-center space-x-4">
            <label htmlFor="email"className="block w-32 text-sm font-medium text-gray-900 dark:text-white">メールアドレス</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
             className=" px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4 flex  justify-center items-center space-x-4">
            <label htmlFor="pass"className="block w-32 text-sm font-medium text-gray-900 dark:text-white">パスワード</label>
            <input id="pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)}
             className=" px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <button type="button" onClick={onSignUpClick}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-10 py-2.5">
              新規作成
            </button>
          </div>
        </div>
      </div>
    </>
    )
}