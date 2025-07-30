import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../../utils/CONSTANTS";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age || 0);
  const [gender, setGender] = useState(user.gender || "male");
  const [photo, setPhoto] = useState(user.photo);
  const [error, setError] = useState("");
  const [toast, showToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      setError("");
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, about, age, gender, photo },
        { withCredentials: true }
      );
      console.log(response?.data?.data);
      dispatch(addUser(response?.data?.data));

      showToast(true);
      setInterval(() => {
        showToast(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setError("Error:", error);
    }
  };
  return (
    <div className="">
      <div className="flex justify-center my-10">
        <div className="card bg-neutral w-96 mx-5">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">FirstName :</legend>
                <input
                  type="text"
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name:</legend>
                <input
                  type="input"
                  className="input"
                  onChange={(e) => setlastName(e.target.value)}
                  value={lastName}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About :</legend>
                <input
                  type="input"
                  className="input"
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age :</legend>
                <input
                  type="input"
                  className="input"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender :</legend>
                <input
                  type="input"
                  className="input"
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo :</legend>
                <input
                  type="input"
                  className="input"
                  onChange={(e) => setPhoto(e.target.value)}
                  value={photo}
                />
              </fieldset>
            </div>
            <p className="text-red-500 error-text my-2">{error}</p>
            <div className="card-actions justify-center mt-2">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save changes
              </button>
            </div>
          </div>
          
        </div>
        <UserCard user={{ firstName, lastName, age, about, gender, photo }} />
      </div>
      {toast && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>Profile updated successfully.</span>
              </div>
            </div>
          )}
    </div>
  );
};

export default EditProfile;
