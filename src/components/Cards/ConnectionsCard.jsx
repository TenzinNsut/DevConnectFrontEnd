import { useDispatch } from 'react-redux';
import { openChat } from '../../utils/chatSlice';
import { useSelector } from "react-redux"; // Import useDispatch

const ConnectionsCard = ({ user }) => {
    const dispatch = useDispatch();
  const { notifications } = useSelector(store => store.chat);
  const hasNotification = notifications[user._id];
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
                <div className="absolute bottom-4 left-4 bg-black/70
      backdrop-blur-md px-4 py-2 rounded-xl">
                    <h2 className="text-xl font-bold">
                        {firstName} {lastName}
                    </h2>
                    <p className="text-sm text-gray-300">{age} years
                        old</p>
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
                    <button onClick={handleMessageClick} className="relative cursor-pointer flex-1 text-shadow-2xs bg-indigo-600 hover:bg-indigo-700  text-white font-semibold py-3 rounded-2xl shadow-lg transition">
                        {hasNotification && <span className="absolute top-1 right-1 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-gray-900"></span>}
                        💭 Message
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConnectionsCard;