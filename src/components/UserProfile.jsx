import { useSelector } from "react-redux"
import EditProfile from "./EditProfile";


const UserProfile = () => {

  const user = useSelector((store) => {return store.user});


  return (
      <div>
          
      <EditProfile user={user} />
      
    </div>
  )
}

export default UserProfile
