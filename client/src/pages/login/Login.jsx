import React, { useEffect, useState } from "react"
import "./Login.scss"
import useAuthContext from "../../hooks/use-auth-context";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState(null);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username,password);
    const currenUser = localStorage.getItem('currentUser')
    if(currenUser) { navigate('/') } 
    setUsername('');
    setPassword('');
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input type="text" name="username" placeholder="oguz" value={username} onChange={(e) => setUsername(e.target.value)}/>

        <label htmlFor="">Password</label>
        <input type="text" name="password" placeholder="123qwe" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
      
    </div>
  )
}

export default Login