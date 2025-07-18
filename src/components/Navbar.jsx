import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="navbar bg-base-300 shadow-sm px-8">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevBuddy</a>
      </div>
      <div className="flex items-center">
      
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
          ></div>
        </div>
        {user && (
          
          <div className="dropdown dropdown-end flex items-center">
            <div className="form-control px-2 font-semibold">Welcome, {user.firstName}</div>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 shadow"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
        )}
        
      </div>
    </div>
  );
};

export default Navbar;
