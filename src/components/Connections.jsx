/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../../utils/CONSTANTS";
import { addConnections } from "../../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async (req, res) => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(response?.data?.data));
    } catch (error) {
      res.status(400).send("Error : ", error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-40 h-40 text-gray-400"
          viewBox="0 0 64 64"
          fill="none"
        >
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="currentColor"
            strokeWidth="2"
          />
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
        <p className="text-gray-500 mt-4 text-lg font-medium">
          No Connections Found
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="my-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Connections</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection, index) => {
            const { firstName, lastName, age, about, gender, photo } =
              connection;

            return (
              <div
                key={index}
                className="card bg-base-200 shadow-sm border border-white"
              >
                <div className="card-body flex flex-row items-center space-x-4">
                  <img
                    src={photo}
                    alt="user_avatar"
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div className="text-left">
                    <h3 className="card-title text-xl font-semibold">
                      {firstName} {lastName}
                    </h3>
                    {age && gender && (
                      <p className="text-sm text-gray-500">
                        {age}, {gender}
                      </p>
                    )}
                    {about && (
                      <p className="mt-1 text-gray-400 text-sm">{about}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Connections;
