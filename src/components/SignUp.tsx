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
      <SSignInFrame>
        <SSignInRow>
          <SSignInLabel>
            <label htmlFor="id">ID</label>
          </SSignInLabel>
          <SSignInInput>
            <input
              id="id"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </SSignInInput>
        </SSignInRow>
        <SSignInRow>
          <SSignInLabel>
            <label htmlFor="email">Email</label>
          </SSignInLabel>
          <SSignInInput>
            <input
              id="email"
              type="email"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </SSignInInput>
        </SSignInRow>
        <SSignInRow>
          <SSignInLabel>
            <label htmlFor="password">Password</label>
          </SSignInLabel>
          <SSignInInput>
            <input
              id="password"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </SSignInInput>
        </SSignInRow>
        <SSignInRow>
          <SLoginButton type="button" onClick={onSignUpClick}>
            新規作成
          </SLoginButton>
        </SSignInRow>
      </SSignInFrame>
    </>
  );
}

const SSignInFrame = styled.div`
  background-color: #f8f8f8;
  margin: 80px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 8px 8px #aaaaaa;
`;

const SSignInRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
`;

const SSignInLabel = styled.span`
  display: inline-block;
  width: 25%;
  vertical-align: top;
  text-align: right;
  margin-right: 4px;
`;

const SSignInInput = styled.span`
  display: inline-block;
  width: auto;
  vertical-align: top;
  margin-left: 4px;
`;

const SLoginButton = styled.button`
  background-color: #444444;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
`;
