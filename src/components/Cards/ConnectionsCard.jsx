import { useDispatch } from 'react-redux';
import { openChat } from '../../utils/chatSlice';
import { useSelector } from "react-redux";

const ConnectionsCard = ({ user }) => {
    const dispatch = useDispatch();
    const { notifications } = useSelector(store => store.chat);
    const { unreadMessages } = useSelector(store => store.messages);
    const { onlineUsers } = useSelector(store => store.onlineStatus);
    
    const hasNotification = notifications[user._id];
    const isOnline = onlineUsers.includes(user._id);
    
    // Check for unread messages from this user
    const unreadFromUser = unreadMessages.find(msg => msg.senderId === user._id);
    const unreadCount = unreadFromUser ? unreadFromUser.count : 0;
    
    const { firstName, lastName, age, gender, about, photoUrl,
        skills } = user;

    const handleMessageClick = () => {
        console.log("Attempting to open chat for user:", user);
        dispatch(openChat(user));
    };

    // Handle skills (array or string input) - more robust processing
    const skillsArray = (() => {
        if (Array.isArray(skills)) {
            return skills.flatMap(skill =>
                typeof skill === 'string' ? skill.split(',').map(s  => s.trim()).filter(s => s) : skill).filter(Boolean);
        } else if (typeof skills === 'string' && skills.trim().
            length > 0) {
            return skills.split(',').map(s => s.trim()).filter(s=> s);
        }
        return [];
    })();

    return (
        <div className="max-w-sm w-full bg-gradient-to-b
      from-gray-900 to-gray-800 text-white rounded-3xl shadow-xl
      overflow-hidden transform hover:scale-[1.02] transition
      duration-300">
            {/* Profile Photo */}
            <div className="relative">
                <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-64 object-cover rounded-t-3xl"
                />
                
                {/* Online Status Indicator */}
                {/* {isOnline && (
                    <div className="absolute top-4 right-4 bg-green-500 border-2 border-gray-900 rounded-full p-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                )} */}
                
                {/* Notification Badge */}
                {/* {(hasNotification || unreadCount > 0) && (
                    <div className="absolute top-4 left-4 bg-red-500 border-2 border-gray-900 rounded-full p-1.5">
                        <div className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">
                                {unreadCount > 0 ? (unreadCount > 9 ? '9+' : unreadCount) : '!'}
                            </span>
                        </div>
                    </div>
                )} */}
                
                <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold">
                            {firstName} {lastName}
                        </h2>
                        {isOnline && (
                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                                Online
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-300">{age} years old</p>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
                {/* Gender */}
                <span className="inline-block text-xs uppercase
      tracking-wider bg-gray-700 px-3 py-1 rounded-full">
                    {gender}
                </span>

                {/* About */}
                <p className="text-gray-300 leading-relaxed
      line-clamp-3">{about}</p>

                {/* Skills */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-400
      mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {skillsArray.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-3 py-1.5 rounded-full
      shadow-md whitespace-nowrap"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="relative flex justify-between pt-4 gap-3">
                    <button 
                        onClick={handleMessageClick} 
                        className="relative cursor-pointer flex-1 text-shadow-2xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        {/* Enhanced Notification Badge */}
                        {(hasNotification || unreadCount > 0) && (
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full min-w-[25px] min-h-[25px] h-5 flex items-center justify-center px-1 ring-2 ring-gray-900 animate-pulse">
                                {unreadCount > 0 ? (unreadCount > 9 ? '9+' : unreadCount) : '!'}
                            </span>
                        )}
                        
                        {/* Online indicator on button */}
                        {/* {isOnline && (
                            <span className="absolute top-1 left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        )} */}
                        
                        <span className="flex items-center justify-center gap-2">
                            💭 Message
                            {isOnline && <span className="text-xs opacity-80">(Online)</span>}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConnectionsCard;