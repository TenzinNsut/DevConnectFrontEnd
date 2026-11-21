import { useState } from 'react';
import { X, ArrowRight, Terminal } from 'lucide-react';

const UserCard = ({ user, handleSendRequest }) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } = user;
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const displayName = (firstName?.trim() || lastName?.trim()) 
    ? `${firstName || ''} ${lastName || ''}`.trim() 
    : "Developer Name";
  const displayAge = age && String(age).trim() ? `${String(age).trim()} yrs old` : "Age";
  const displayGender = gender || "Developer";
  const displayAbout = about?.trim() || "Your technical bio and collaboration goals will appear here.";

  const skillsArray = Array.isArray(skills)
    ? skills
    : (typeof skills === 'string' && skills.trim().length > 0
        ? skills.split(',').map(s => s.trim()).filter(Boolean)
        : []);

  const handleButtonClick = (status, id) => {
    if (!handleSendRequest || isAnimating) return;

    setIsAnimating(true);
    setSwipeDirection(status === 'ignored' ? 'left' : 'right');

    setTimeout(() => {
      handleSendRequest(status, id);
    }, 300);
  };

  return (
    <div className="max-w-md w-full mx-auto select-none">
      <div
        className={`relative bg-[#111113] border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ease-out hover:border-white/20
          ${isAnimating 
            ? (swipeDirection === 'left' ? '-translate-x-full -rotate-6 opacity-0' : 'translate-x-full rotate-6 opacity-0') 
            : 'opacity-100'
          }`}
      >
        {/* Profile Photo */}
        <div className="relative h-96 w-full overflow-hidden bg-black">
          <img
            src={photoUrl || "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/30"></div>

          {/* Name & Age Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-medium tracking-tight text-[#E1E0CC]">{displayName}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-[#E1E0CC]/70 font-mono">{displayAge}</span>
              <span className="text-[#E1E0CC]/30">·</span>
              <span className="text-[10px] uppercase tracking-wider font-mono text-[#E1E0CC]/80 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                {displayGender}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-sm leading-relaxed text-[#E1E0CC]/80 font-normal line-clamp-3">
            "{displayAbout}"
          </p>

          {skillsArray.length > 0 && (
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#E1E0CC]/50">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skillsArray.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white/5 text-[#E1E0CC]/90 border border-white/10 font-mono text-xs px-2.5 py-1 rounded-full whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleButtonClick('ignored', _id)}
              disabled={isAnimating}
              className={`cursor-pointer group flex items-center justify-center gap-2 py-3 px-4 rounded-full font-medium text-sm bg-black/60 hover:bg-black text-[#E1E0CC]/70 hover:text-[#E1E0CC] border border-white/15 transition-all
                ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
            >
              <X className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              <span>Pass</span>
            </button>

            <button
              onClick={() => handleButtonClick('interested', _id)}
              disabled={isAnimating}
              className={`cursor-pointer group flex items-center justify-center gap-2 py-3 px-4 rounded-full font-medium text-sm transition-all shadow-xl hover:opacity-95
                ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
              style={{ backgroundColor: "#E1E0CC", color: "#000000" }}
            >
              <span>Connect</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal Swipe Feedback Stamp */}
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/60 backdrop-blur-[2px]">
            <div
              className={`text-4xl font-mono tracking-widest uppercase border-2 rounded-2xl px-6 py-2.5 transform ${
                swipeDirection === 'left'
                  ? 'text-white/40 border-white/40 -rotate-6'
                  : 'text-[#E1E0CC] border-[#E1E0CC] rotate-6'
              }`}
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
