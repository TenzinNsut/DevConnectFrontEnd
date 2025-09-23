import axios from "axios"
import { addRequests, removeRequests } from "../utils/requestsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import RequestsCard from "../components/Cards/RequestsCard";

const Requests = () => {
  const requestsRecieved = useSelector((store) => store.requests);

  const dispatch = useDispatch();
  const [error, setError] = useState("");


  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res)
      console.log(BASE_URL + "/request/review/" + status + "/" + _id);
      dispatch(removeRequests(_id));
    
    } catch (error) {
      console.error(error);
    }
  }

  const getRequests = async () => {
    setError("");
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });

      dispatch(addRequests(res.data.data));
      
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Unable to find requests");
      console.error(error);
    }
  }

  useEffect(() => { getRequests() }, []);

  //  if (!requestsRecieved) return;



  return (
             <div className="min-h-screen flex flex-col items-center py-12 px-6 bg-gradient-to-b from-gray-900 to-black text-white">

            <h1 className="text-3xl font-bold mb-8">✨ Requests Recieved</h1>

            {error && (
                <p className="text-red-400 text-lg mb-4 bg-red-900/40 px-4 py-2 rounded-lg">
                    {error}
                </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {requestsRecieved && requestsRecieved.length > 0 ? (
                    requestsRecieved.map((user) => (
                        <RequestsCard key={user._id} user={user} id={user._id} reviewRequest={reviewRequest} />
                    ))
                ) : (
                    <p className="text-gray-400 text-lg col-span-full text-center">
                        No requests found. 👀
                    </p>
                )}
            </div>

        </div>
  )
}

export default Requests
