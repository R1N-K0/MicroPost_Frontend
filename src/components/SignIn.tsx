import { useState, useContext } from "react"
import { sign_in } from "../api/Auth"
import {  Link, useNavigate } from "react-router-dom"
import { UserContext } from "../providers/UserProvider";


export default function SignIn() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState<string>("")
    const [pass, setPass] = useState<string>("")
    const {setUserInfo} = useContext(UserContext)

    const onSignInClick = async () => {
        try {console.log("onSignInClick")
          const ret = await sign_in(userId, pass)
          if (ret && ret.token) {
              setUserInfo({
                  id: ret.user_id,
                  token: ret.token,
              })
              navigate("/main");
        }} catch(error :any) {
          alert(error.message || JSON.stringify(error))
        }
    }

    return (

      <div className="bg-white w-100 h-full">
        <div className="container p-8 rounded-lg shadow-lg  w-[70%] border-1 mx-auto mt-60">
          <div className="text-2xl font-bold mb-6 text-center text-gray-800">
              ログイン
          </div>
          <div className="mb-4 flex  justify-center items-center space-x-4">
            <label htmlFor="name" className=" block text-sm font-medium text-gray-900 dark:text-white">ユーザー名</label>
            <input id="name" type="text" value={userId} onChange={(e) => setUserId(e.target.value)}
            className=" px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4 flex  justify-center items-center space-x-4">
            <label htmlFor="pass"className="block text-sm font-medium text-gray-900 dark:text-white">パスワード</label>
            <input id="pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)}
             className=" px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex items-center justify-center space-x-3">
            <button type="button" onClick={onSignInClick}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
              ログイン
            </button>
            <Link to="/signUp">
              <button type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">
                新規作成
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
}