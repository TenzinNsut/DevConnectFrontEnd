import { X, Check } from 'lucide-react';

const RequestsCard = ({ user, reviewRequest, id }) => {
  const { firstName, lastName, age, gender, about, photoUrl, skills } = user;

  const skillsArray = (() => {
    if (Array.isArray(skills)) {
      return skills.flatMap(skill => 
        typeof skill === 'string' ? skill.split(',').map(s => s.trim()).filter(Boolean) : skill
      ).filter(Boolean);
    } else if (typeof skills === 'string' && skills.trim().length > 0) {
      return skills.split(',').map(s => s.trim()).filter(Boolean);
    }
    return [];
  })();

  return (
    <div className="w-full bg-[#111113] border border-white/10 rounded-3xl shadow-xl overflow-hidden hover:border-white/20 transition-all flex flex-col justify-between group">
      <div>
        {/* Profile Photo */}
        <div className="relative h-64 w-full overflow-hidden bg-black">
          <img
            src={photoUrl || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/30"></div>

          {/* Name & Age Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <h2 className="text-xl font-medium tracking-tight text-[#E1E0CC]">{firstName} {lastName}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              {age && <span className="text-xs text-[#E1E0CC]/70 font-mono">{age} yrs old</span>}
              {age && gender && <span className="text-[#E1E0CC]/30">·</span>}
              {gender && (
                <span className="text-[10px] uppercase tracking-wider font-mono text-[#E1E0CC]/80 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                  {gender}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {about && (
            <p className="text-xs sm:text-sm leading-relaxed text-[#E1E0CC]/75 font-normal line-clamp-3">
              "{about}"
            </p>
          )}

          {skillsArray.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#E1E0CC]/50">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skillsArray.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white/5 text-[#E1E0CC]/90 border border-white/10 font-mono text-xs px-2.5 py-0.5 rounded-full whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-0 grid grid-cols-2 gap-3">
        <button
          onClick={() => reviewRequest("rejected", id)}
          className="cursor-pointer group flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-medium text-xs sm:text-sm bg-black/60 hover:bg-black text-[#E1E0CC]/70 hover:text-[#E1E0CC] border border-white/15 transition-all active:scale-95"
        >
          <X className="w-4 h-4 opacity-70" />
          <span>Pass</span>
        </button>

        <button
          onClick={() => reviewRequest("accepted", id)}
          className="cursor-pointer group flex items-center justify-center gap-2 py-2.5 px-4 rounded-full font-medium text-xs sm:text-sm transition-all hover:opacity-95 active:scale-95"
          style={{ backgroundColor: "#E1E0CC", color: "#000000" }}
        >
          <Check className="w-4 h-4" />
          <span>Accept</span>
        </button>
      </div>
    </div>
  );
};

export default RequestsCard;
