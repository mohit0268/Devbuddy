import React, { useEffect } from "react";
import BASE_URL from "../../utils/CONSTANTS";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  

  const getFeed = async (res) => {
    if(feed) return;
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(response?.data));
     } catch (error) {
        res.status(400).send('Something went wrong!',error);
    }
  };
  useEffect(() => {
    getFeed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return feed && (
    <div className="flex justify-center my-10">
    <UserCard user={feed[0]}/>
    </div>
  )
};

export default Feed;
