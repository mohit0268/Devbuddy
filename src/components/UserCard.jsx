import axios from "axios";
import React ,{ useState}from "react";
import BASE_URL from "../../utils/CONSTANTS";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../utils/feedSlice";

const UserCard = ({user}) => {
  
  const [error,setError] = useState("");
  const dispatch = useDispatch();

  const { _id, firstName, lastName, age, about, photo, gender } = user;

  const handleSendRequest = async(status,userId)=>{
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, {withCredentials:true});
      dispatch(removeFeed(_id))
      
      
    } catch (error) {
      setError("error occured:",error.message)
      console.log(error.message);
    }
    
  }
  

  
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={photo}
          alt="user_avatar"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <p className="text-red-600 font-bold">{error}</p>
        <div className="card-actions justify-center my-5">
          <button className="btn btn-primary btn-lg" onClick={()=> handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn btn-secondary btn-lg" onClick={()=> handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
