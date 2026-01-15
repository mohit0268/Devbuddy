import { useState } from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import BASE_URL from '../../utils/CONSTANTS'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginChangeHandler = async () => {
    try {
      const res = await axios.post(BASE_URL + '/login', {
        email,
        password
      }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate('/');
    } catch (error) {
      setError(error?.response?.data?.message || 'Login failed');
      console.error("Axios error occurred", error);
    }
  }

  return (
    <div className="flex justify-center items-center mt-auto min-h-auto">
      <div className="card bg-neutral w-96 m-10">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email address</legend>
              <input
                type="email" 
                className="input"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </fieldset>
          </div>
          <p className="text-red-500 error-text">{error}</p>
          <div className="card-actions justify-center">
            <button 
              className="btn btn-primary" 
              onClick={loginChangeHandler}
              disabled={!email || !password}
            >
              Login
            </button>
            
          </div>
          <p className="text-sm text-center mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline font-semibold">
                Sign Up
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
