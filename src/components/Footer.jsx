import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-[#E1E0CC]/70 py-16 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-8 border-b border-white/10">
          
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-1.5 font-medium tracking-[-0.04em] text-2xl text-[#E1E0CC]">
              <span>DevConnect</span>
              <span className="text-base -mt-2 font-mono select-none">*</span>
            </Link>
            <p className="text-xs sm:text-sm text-[#E1E0CC]/60 max-w-sm font-normal leading-relaxed">
              The worldwide network connecting software engineers, designers and builders through craft and curiosity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium">
            <Link to="/features" className="hover:text-[#E1E0CC] transition-colors">Features</Link>
            <Link to="/how-it-works" className="hover:text-[#E1E0CC] transition-colors">How it works</Link>
            <Link to="/tech-stack" className="hover:text-[#E1E0CC] transition-colors">Tech stack</Link>
            <Link to="/login" className="hover:text-[#E1E0CC] transition-colors">Sign In</Link>
            <Link to="/signup" className="hover:text-[#E1E0CC] transition-colors">Get Started</Link>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#E1E0CC]/50 gap-4 font-mono">
          <p>© {new Date().getFullYear()} DevConnect. Built by Tenzin Lekshey.</p>
          
          <div className="flex items-center gap-5">
            <a 
              href="https://github.com/TenzinNsut" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#E1E0CC] transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/tenzin-lekshey-66120a211/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#E1E0CC] transition-colors flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://www.instagram.com/ten_zin_10/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#E1E0CC] transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
