/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../utils/CONSTANTS";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../../utils/requestSlice";

const truncateText = (text, wordLimit) => {
  const words = text.trim().split(" ");
  return words.length <= wordLimit
    ? text
    : words.slice(0, wordLimit).join(" ") + "...";
};

const Requests = (res) => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [expandedIds, setExpandedIds] = useState({});

  const reviewRequest = async(status, _id) =>{
    try {
      const response = await axios.post(BASE_URL + '/request/review/' + status + "/" + _id, {}, {withCredentials:true});
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }

  const toggleAbout = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.data));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-40 h-40 text-gray-400"
          viewBox="0 0 64 64"
          fill="none"
        >
          <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" />
          <path
            d="M20 24c0-6 8-10 12-10s12 4 12 10c0 3-2 5-4 6m-16 0c-2-1-4-3-4-6m0 20h24m-24 0c2-4 6-6 12-6s10 2 12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="16"
            y1="48"
            x2="48"
            y2="16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-gray-500 mt-4 text-lg text-center font-medium">
          No Connection Request Found
        </p>
      </div>
    );
  }


  
  return (
    <div className="my-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        Connection Requests
      </h1>

      <div className="grid grid-cols-1 gap-6">
        {requests.map((request) => {
          const {_id, firstName, lastName, age, about, gender, photo } =
            request.senderUserId;

          const isExpanded = expandedIds[_id];

          return (
            <div
              key={_id}
              className="card bg-base-100 shadow-md border border-gray-200 rounded-lg"
            >
              <div className="card-body flex items-start md:flex-row flex-col gap-6">
                <img
                  src={photo}
                  alt="user_avatar"
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {firstName} {lastName}
                  </h3>
                  {age && gender && (
                    <p className="text-sm text-gray-500">
                      {age}, {gender}
                    </p>
                  )}

                  {about && (
                    <p className="text-sm text-gray-600 mt-2">
                      {isExpanded ? about : truncateText(about, 10)}
                      {about.split(" ").length > 10 && (
                        <button
                          onClick={() => toggleAbout(_id)}
                          className="text-blue-500 ml-2 underline"
                        >
                          {isExpanded ? "Show less" : "Show more"}
                        </button>
                      )}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 self-start md:self-center">
                  <button className="btn btn-primary btn-lg" onClick={()=> reviewRequest("accepted", request._id)}>Accept</button>
                  <button className="btn btn-secondary btn-lg" onClick={()=> reviewRequest("rejected", request._id)}>Reject</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
