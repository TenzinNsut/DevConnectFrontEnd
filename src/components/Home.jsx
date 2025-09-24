import React from 'react';
import { Users, Heart, Globe, Zap, Code, MessageSquare, Search, Shield } from 'lucide-react';
import { Link  } from "react-router-dom";

const Home = () => {
  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center mb-30 pt-50 ">
        <div className="mb-4">
          <span className="inline-flex items-center text-sm text-gray-400 mb-6">
            ⭐ Developer Networking Platform
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Find Your Perfect{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            Coding Partner
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-10 max-w-3xl leading-relaxed">
          Connect with developers who share your passion, complement your skills,
          and want to build amazing things together. Swipe, match, collaborate.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link to="/login" >
          <button className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition duration-300 hover:scale-105 ">
            Login to Profile 
          </button>
          </Link>
          <Link to="/signup">
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center">
            Start Matching
            <span className="ml-2">→</span>
            </button>
            </Link>

        </div>
      </div>

      {/* Statistics Section */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6 mb-20">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
          <Users className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">8K+</div>
          <div className="text-gray-400 text-sm">Active Developers</div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
          <Heart className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">1.8K+</div>
          <div className="text-gray-400 text-sm">Successful Matches</div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
          <Globe className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">300+</div>
          <div className="text-gray-400 text-sm">Tech Companies</div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center">
          <Zap className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white mb-1">&lt; 3h</div>
          <div className="text-gray-400 text-sm">Average Response Time</div>
        </div>
      </div> */}

      {/* Why Developers Love DevConnect Section */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Developers Love DevConnect
          </h2>
          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
            Built by developers, for developers. Every feature designed to help you find meaningful
            professional connections.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 text-center hover:border-green-500/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Code className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Skill-Based Matching</h3>
              <p className="text-gray-400 leading-relaxed">
                Connect with developers who complement your tech stack and interests
              </p>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 text-center hover:border-green-500/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Professional Network</h3>
              <p className="text-gray-400 leading-relaxed">
                Build meaningful connections in the tech community
              </p>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 text-center hover:border-green-500/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Real-time Chat (Coming soon)</h3>
              <p className="text-gray-400 leading-relaxed">
                Instantly connect and collaborate with your matches
              </p>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 text-center hover:border-green-500/50 transition-colors duration-300">
              <div className="w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Verified Profiles</h3>
              <p className="text-gray-400 leading-relaxed">
                All developer profiles are verified with GitHub integration
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              Next Collaborator?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join thousands of developers who have found their perfect coding partners, co-founders,
            and lifelong friends.
          </p>
          <Link to="/signup">
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-10 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 inline-flex items-center">
            Get Started Now
            <span className="ml-2">→</span>
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;