import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../components/Cards/UserCard";
import { useEffect, useState } from "react";
import { addConnections } from "../utils/connectionSlice";
import ConnectionsCard from "../components/Cards/ConnectionsCard";


const Connections = () => {
    // Get data from redux store if it is available
    const connections = useSelector((store) => store.connections);

    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const getConnections = async () => {
        try {
            setError("");
            const res = await axios.get(
                BASE_URL + "/user/connections",
                { withCredentials: true }
            );

            dispatch(addConnections(res.data.data))

        } catch (error) {
            setError(error.message || "OOPS! something went wrong. Comeback later");
            console.error(error);
        }
    };

    useEffect(()=>{
        getConnections()
    }, [])


    return (
         <div className="min-h-screen flex flex-col items-center py-12 px-6 bg-gradient-to-b from-gray-900 to-black text-white">
            
            <h1 className="text-3xl font-bold mb-8">✨ My Connections</h1>

            {error && (
                <p className="text-red-400 text-lg mb-4 bg-red-900/40 px-4 py-2 rounded-lg">
                    {error}
                </p>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
                {connections && connections.length > 0 ? (
                    connections.map((user) => (
                        <ConnectionsCard key={user._id} user={user} />
                    ))
                ) : (
                    <p className="text-gray-400 text-lg col-span-full text-center">
                        No connections found. 👀
                    </p>
                )}
            </div>

        </div>
    )
}

export default Connections
