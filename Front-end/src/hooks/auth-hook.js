import {useRef, useState, useEffect, useCallback} from 'react'
import cartSlice from "../redux/cartSlice";
import { useDispatch } from "react-redux";

export default function AuthHook() {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState();
    const [deadlineToken, setDeadlineToken] = useState();
    const [role, setRole] = useState();
  
    const tokenTimeRef = useRef();
    const disPatch = useDispatch()
    useEffect(() => {
      console.log('first time run')
      const userData = JSON.parse(localStorage.getItem('userData'));
      console.log(userData)
      if(!userData) {
        return ;
      }
      else {
        login(userData.userId,userData.role, userData.token, userData.expiredDateToken);
      }
    } , []);
  
    const login = useCallback((userId, role, token, expiredDateToken) => {
  
      setToken(token);
      setUserId(userId);
      setRole(role);
      const userData = {
        userId ,
        role,
        token,
      }
  
      const deadline  = expiredDateToken || new Date(new Date().getTime() + 3600*1000);
      userData.expiredDateToken = deadline;
      setDeadlineToken(deadline );
      localStorage.setItem('userData', JSON.stringify(userData));
  
    }, []);
  
    const logout = useCallback(() => {
      console.log('loged out')
      setToken(null);
      setUserId(null);
      setRole(null);
      localStorage.removeItem('userData');
      disPatch(cartSlice.actions.remove());
    },[]);
  
    useEffect(() => {
      if(token && deadlineToken) {
        const timeRemain = new Date(deadlineToken).getTime() - new Date().getTime();
        tokenTimeRef.current = setTimeout(logout, timeRemain);
      }
      else {
        clearTimeout(tokenTimeRef);
      }
    }, [token, logout])
  return [login, logout, token, userId, role];
}
