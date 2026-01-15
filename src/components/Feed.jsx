import React, { useEffect, useState } from "react";
import BASE_URL from "../../utils/CONSTANTS";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFeed = async () => {
    if (feed?.length > 0) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data?.data || response?.data || []));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <div className="h-[65vh] flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[65vh] flex justify-center items-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="h-[65vh] flex justify-center items-center">
        <h1 className="text-3xl font-bold">No new users found!</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
