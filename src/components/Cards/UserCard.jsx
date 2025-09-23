import { useState } from 'react';

const UserCard = ({ user, handleSendRequest }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } = user;
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null); // 'left', 'right', or null

  const skillsArray = Array.isArray(skills)
    ? skills
    : (typeof skills === 'string' && skills.trim().length > 0
        ? skills.split(',').map(s => s.trim())
        : []);

  const handleButtonClick = (status, id) => {
    if (isAnimating) return; // prevent multiple clicks

    setIsAnimating(true);
    setSwipeDirection(status === 'ignored' ? 'left' : 'right');

    // Delay the Redux update to allow animation to play
    setTimeout(() => {
      handleSendRequest(status, id);
    }, 300); // Animation duration is 300ms
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        className={`relative bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-3xl shadow-2xl overflow-hidden
          transition-all duration-300 ease-out
          ${isAnimating 
            ? (swipeDirection === 'left' ? '-translate-x-full -rotate-12 opacity-0' : 'translate-x-full rotate-12 opacity-0') 
            : 'opacity-100 hover:opacity-95'
          }`}
      >
        {/* Profile Photo */}
        <div className="relative">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-80 object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl">
            <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
            <p className="text-sm text-gray-300">{age} years old</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <span className="inline-block text-xs uppercase tracking-wider bg-gray-700 px-3 py-1 rounded-full">{gender}</span>
          <p className="text-gray-300 leading-relaxed text-sm">{about}</p>

          {skillsArray.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-3 py-1.5 rounded-full shadow-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between pt-4 gap-3">
            <button
              onClick={() => handleButtonClick('ignored', _id)}
              disabled={isAnimating}
              className={`flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-2xl shadow-lg transition duration-300
                ${isAnimating ? 'opacity-75 cursor-not-allowed' : 'transform hover:scale-105 hover:shadow-xl'}`}
            >
              ✖ Pass
            </button>
            <button
              onClick={() => handleButtonClick('interested', _id)}
              disabled={isAnimating}
              className={`flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3.5 rounded-2xl shadow-lg transition duration-300
                ${isAnimating ? 'opacity-75 cursor-not-allowed' : 'transform hover:scale-105 hover:shadow-xl'}`}
            >
              💝 Connect
            </button>
          </div>
        </div>

        {/* Animation Overlay */}
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`text-7xl font-bold uppercase ${
                swipeDirection === 'left' ? 'text-red-500 -rotate-12' : 'text-green-500 rotate-12'
              } opacity-70`}
            >
              {swipeDirection === 'left' ? 'PASS' : 'CONNECT'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
