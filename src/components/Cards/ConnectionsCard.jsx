import { useDispatch, useSelector } from 'react-redux';
import { openChat } from '../../utils/chatSlice';
import { MessageSquare, ArrowRight } from 'lucide-react';

const ConnectionsCard = ({ user }) => {
  const dispatch = useDispatch();
  const { notifications } = useSelector(store => store.chat) || {};
  const { unreadMessages } = useSelector(store => store.messages) || {};
  const { onlineUsers } = useSelector(store => store.onlineStatus) || {};

  const hasNotification = notifications ? !!notifications[user._id] : false;
  const isOnline = onlineUsers ? onlineUsers.includes(user._id) : false;

  const unreadFromUser = (unreadMessages || []).find(msg => msg.senderId === user._id);
  const unreadCount = unreadFromUser ? unreadFromUser.count : 0;

  const { firstName, lastName, age, gender, about, photoUrl, skills } = user;

  const handleMessageClick = () => {
    dispatch(openChat(user));
  };

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
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-black/30"></div>

          {/* Online status indicator */}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 font-mono text-xs">
            <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-[#E1E0CC]" : "bg-white/30"}`}></span>
            <span className="text-[#E1E0CC]/80">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

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
      <div className="p-6 pt-0">
        <button
          onClick={handleMessageClick}
          className="w-full relative cursor-pointer flex items-center justify-center gap-2.5 py-3 px-4 rounded-full font-medium text-sm transition-all hover:opacity-95 shadow-xl active:scale-95"
          style={{ backgroundColor: "#E1E0CC", color: "#000000" }}
        >
          {(hasNotification || unreadCount > 0) && (
            <span className="absolute -top-1.5 -right-1.5 bg-black text-[#E1E0CC] border border-white/20 text-xs font-mono font-bold rounded-full h-5 min-w-5 flex items-center justify-center px-1">
              {unreadCount > 0 ? (unreadCount > 9 ? '9+' : unreadCount) : '!'}
            </span>
          )}

          <MessageSquare className="w-4 h-4" />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
};

export default ConnectionsCard;
