import axios from 'axios'
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router";
import BASE_URL from '../utils/CONSTANTS'
import { useDispatch, useSelector } from 'react-redux';
import {addUser} from '../utils/userSlice'
import { useEffect, useState } from 'react';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true);
  const userData = useSelector((store)=>store.user);

  const fetchUser = async() => {
    try {
      const response = await axios.get(BASE_URL + "/profile/view" ,{withCredentials:true});
      dispatch(addUser(response.data));
    } catch (error) {
      if(error.status === 401){
        navigate('/login')
      }
      
      console.error(error);
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    if(!userData){
      fetchUser();
    }
    
  },[]);

  if(loading) return null;

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
