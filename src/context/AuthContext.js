import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'
import { request } from '../utils/fetchAPI';

const BASE_URL = process.env.REACT_APP_BASE_URL

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    // const navigate = useNavigate()

    let loginUser = async (e )=> {
        e.preventDefault()
        let response = await fetch(BASE_URL + 'api/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            
        }else{
            alert('Something went wrong!')
        }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let authRequest = async (url, method, headers = {}, body = {}, isNotStringified = false) => {
        if (authTokens) {
                const [data, status] = await request(url, method, {...headers, Authorization: `Bearer ${authTokens?.access ?? null}` }, body, isNotStringified)
                if (status === 200 || status === 201) {
                    return data
                } else if(status === 401) {
                    const newTokens = await updateToken()
                    const [data, status] = await request(url, method, {...headers, Authorization: `Bearer ${newTokens?.access ?? null}` }, body, isNotStringified)
                    if (status === 200 || status === 201) {
                        return data
                    } else {
                        throw new Error(status)
                    }
                } else {
                    throw new Error(status)
                }
        } else {
            logoutUser()
        }
        
    }

    let updateToken = async () => {
        try {
          const response = await fetch(BASE_URL + 'api/refresh', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: authTokens?.refresh })
          });
      
          const data = await response.json();
      
          if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            return data;
          } else {
            logoutUser();
          }
        } catch (error) {
          console.log(error);
          logoutUser();
        }
      }
    
    
    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        updateToken:updateToken,
        authRequest:authRequest,
    }


    // useEffect(()=> {

    //     if(loading){
    //         updateToken()
    //     }

    //     let fourMinutes = 1000 * 60 * 4

    //     let interval =  setInterval(()=> {
    //         if(authTokens){
    //             updateToken()
    //         }
    //     }, fourMinutes)
    //     return ()=> clearInterval(interval)

    // }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}