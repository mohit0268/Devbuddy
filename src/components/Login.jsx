import { useState } from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from '../../utils/CONSTANTS'


const Login = () => {
  const [email,setEmailID]= useState('vicky@gmail.com');
  const [password,setPassword] = useState('Vicky@123');
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const loginChangeHandler =async ()=>{
    try {
      const res = await axios.post(BASE_URL + '/login',{
        email,
        password
      },{withCredentials:true});
      dispatch(addUser(res.data));
      return navigate('/');
    } 
    catch (error) {
      setError(error?.response?.data);
      console.error("Axios error occured",error);
    }
  }

  return (
    
    <div className="flex justify-center h-[100wh]">
      <div className="card bg-neutral w-96 m-10">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email address</legend>
              <input
                type="text"
                className="input"
                onChange={(e)=> setEmailID(e.target.value)}
                value={email}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
              />
            </fieldset>
          </div>
          <p className="text-red-500 error-text">{error}</p>
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-primary" onClick={loginChangeHandler}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
