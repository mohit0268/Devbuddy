import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../utils/CONSTANTS";
import { removeUser } from "../../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async ()=>{
    try {
      await axios.post(BASE_URL + "/logout",{},{withCredentials:true});
      dispatch(removeUser())
      navigate('/login')
      
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="navbar bg-base-300 shadow-sm px-8">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">DevBuddy</Link>
      </div>
      <div className="flex items-center">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          ></div>
        </div>
        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex items-center">
              <div className="flexform-control px-2 font-semibold">
                Welcome, {user.firstName}
              </div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photo}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 shadow"
            >
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <Link to='/connections'>Connections</Link>
              </li>
              <li>
                <Link to='/requests'>Requests</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
