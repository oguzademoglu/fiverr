import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function Provider({ children }) {
    const [err, setErr] = useState(null);
    const URL = "http://127.0.0.1:8800/api/auth/";
    const login = async (username, password) => {
        try {
            const res = await axios.post(URL+'login', {username, password});
            localStorage.setItem('currentUser', JSON.stringify(res.data))
        } catch (error) {
            setErr(error);
            console.log(error);
            return;
        }
    }
    const logout = async() => {
        try {
            await axios.post(URL+'logout')
            localStorage.removeItem('currentUser')
        } catch (error) {
            setErr(error);
            console.log(error);
        }
    }
    const register = async (user) => {
        try {
            const res = await axios.post(URL+'register', {...user})
            console.log(res.data)
        } catch (error) {
            setErr(error);
            console.log(error);
        }
    }
    const values = {
        login,
        logout,
        register
    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export {Provider} 
export default AuthContext;