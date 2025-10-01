const RequestsCard = ({  user, reviewRequest, id} ) => {
  const { firstName, lastName, age, gender, about, photoUrl, skills } = user;

  // Handle skills (array or string input) - more robust processing
  const skillsArray = (() => {
    if (Array.isArray(skills)) {
      // If it's already an array, flatten and clean any nested strings
      return skills.flatMap(skill => 
        typeof skill === 'string' ? skill.split(',').map(s => s.trim()).filter(s => s) : skill
      ).filter(Boolean);
    } else if (typeof skills === 'string' && skills.trim().length > 0) {
      // Split by comma and clean up
      return skills.split(',').map(s => s.trim()).filter(s => s);
    }
    return [];
  })();

  return (
    <div className="max-w-sm w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition duration-300">
      {/* Profile Photo */}
      <div className="relative">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-64 object-cover rounded-t-3xl"
        />
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl">
          <h2 className="text-xl font-bold">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-300">{age} years old</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* Gender */}
        <span className="inline-block text-xs uppercase tracking-wider bg-gray-700 px-3 py-1 rounded-full">
          {gender}
        </span>

        {/* About */}
        <p className="text-gray-300 leading-relaxed line-clamp-3">{about}</p>

        {/* Skills */}
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skillsArray.map((skill, index) => (
              <span
                key={index}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1.5 rounded-full shadow-md whitespace-nowrap"

                // className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs px-3 py-1.5 rounded-full shadow-md whitespace-nowrap"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 gap-3">
          <button onClick={() => reviewRequest("rejected", id)}
            // className=" cursor-pointer flex-1 text-shadow-2xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition"
                        className="cursor-pointer flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-2xl shadow-lg transition duration-300 border border-gray-600 hover:border-gray-500 transform hover:scale-105"

          >
            ✖ Pass
          </button>
          <button onClick={() => reviewRequest("accepted", id)}
            // className=" cursor-pointer flex-1 text-shadow-2xs bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition"
                        className="cursor-pointer flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition duration-300 transform hover:scale-105"

          >
            ✅ Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestsCard;