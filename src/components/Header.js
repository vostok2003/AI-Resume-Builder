import React from 'react';
import Logo from '../assets/logo.png';

const Header = () => {
  return (
    <header className="w-full bg-white py-4 px-8 shadow-md relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative">
        <div className="relative">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </div>
        <div className="relative">
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;