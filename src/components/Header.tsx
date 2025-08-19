import { useContext, useEffect, useState } from "react"
import { UserContext } from "../providers/UserProvider"
import { Link, useNavigate } from "react-router-dom"
import { getUser } from "../api/User";
import styled from "styled-components";

export default function Header() {
    const navigate = useNavigate();
    const {userInfo,setUserInfo} = useContext(UserContext)
    const [userName, setUserName] = useState<string>("");
    
    const logout = () => {
        setUserInfo({id: 0, token: ""})
        navigate("/");
    }

    useEffect(() => {
        const myGetUser = async () => {
            const user = await getUser(userInfo.id, userInfo.token)
            setUserName(user.name)
        }
        myGetUser()
    }, [])

    return (
        <div className="bg-gray-900 flex flex-row text-white px-6 h-full items-center py-3">
            <div className="font-bold text-lg"><Link to="/main">MicroPost</Link></div>
            <div className="flex flex-row justify-end items-center w-full space-x-3">
                <div><Link to={`/main/${userInfo.id}`}>{userName}</Link></div>
                <div className="cursor-pointer" onClick={logout}>ログアウト</div>
            </div>
        </div>
    )
}

const SHeader = styled.div`
  background-color: #222222;
  display: flex;
  flex-direction: row;
  color: #F8F8F8;
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
`

const SLogo = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  justyify-content: start;
`

const SRightItem = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`

const SName = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  margin-right: 8px;
`
const SLogout = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
`