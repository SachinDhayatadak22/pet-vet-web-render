import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Hamburger & close icons

import Arrowdown from '../../images/home/arrowdown.png';

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({});
  const [isOpenLang, setIsOpenLang] = useState(false);
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese'];

  const toggleLanguage = () =>{
    setIsOpenLang(!isOpenLang);
  }

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-between flex-wrap items-center text-white">
      {/* Website Name (Always Visible) */}
      <div className="font-Strasua text-[22px] font-normal leading-[26.4px] text-left text-[#E5BF00]">
        <a href="#home" className=''>ICO TOKEN</a>
      </div>

      {/* Hamburger Icon (Visible on Mobile) */}
      <div className="sm:hidden">
        <button onClick={toggleMenu} className="font-Poppins text-[18px] font-medium leading-[27px] text-white">
          {isOpen ? (
            <FaTimes />
          ) : (
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 px-2 sm:px-4 md:px-5 py-2 rounded-2xl border border-[#2F2F2F]">
                <span className="text-xs font-normal">Language</span>
                <span>
                  <img src={Arrowdown} alt="arrowdown" />
                </span>
              </div>
              <FaBars />
            </div>
          )}
        </button>
      </div>

      {/* Desktop Navigation Menu (Hidden on Mobile) */}
      <nav className={`hidden sm:flex items-center gap-2 sm:gap-3 md:gap-5`}>
        <ul className="flex space-x-5 xl:space-x-8 xxl:space-x-10 text-xs font-normal">
          <li>
            <a href="#home" className="hover:text-yellow-500">
              Home
            </a>
          </li>
          <li>
            <a href="#policy" className="hover:text-yellow-500">
              Policy Ecosystem
            </a>
          </li>
          <li>
            <a href="#token" className="hover:text-yellow-500">
              Token
            </a>
          </li>
          <li>
            <a href="#lightpaper" className="hover:text-yellow-500">
              Light Paper
            </a>
          </li>
          <li>
            <a href="#ourteam" className="hover:text-yellow-500">
              Our Team
            </a>
          </li>
        </ul>

        {/* Language Selection and Login Button */}
        <div className="relative inline-block">
            <div
                className="flex items-center gap-2 md:gap-3 px-2 sm:px-4 md:px-5 py-2 rounded-2xl border border-[#2F2F2F] cursor-pointer"
                onClick={toggleLanguage} // Toggle dropdown on click
            >
                <span className="text-xs font-normal">Language</span>
                <span>
                    <img src={Arrowdown} alt="arrowdown" />
                </span>
            </div>

            {isOpenLang && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white border border-[#2F2F2F] z-10">
                    <ul className="py-1">
                        {languages.map((language) => (
                            <li
                                key={language}
                                className="px-4 py-2 text-sm text-black hover:bg-[#E5BF00] hover:text-white cursor-pointer"
                                onClick={() => {
                                    // Handle language selection here
                                    console.log(`Selected language: ${language}`);
                                    setIsOpen(false); // Close dropdown after selection
                                }}
                            >
                                {language}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        {userData?.role ? (
          <button
            onClick={() => navigate('/login/admin')}
            className="bg-[#E5BF00] px-5 sm:px-8 md:px-10 text-black p-1  text-[0.9rem] py-2 rounded-3xl text-xs sm:text-sm font-bold"
          >
            Login
          </button>
        ) : null}
      </nav>

      {/* Mobile Navigation Menu (Visible when Hamburger is clicked) */}
      {isOpen && (
        <nav className="absolute top-18 left-0 h-[100vh] z-99999 w-full bg-[#161616] text-white p-5 sm:hidden">
          <ul className="space-y-4 text-center text-sm sm:text-lg">
            <li>
              <a href="#home" className="hover:text-yellow-500">
                Home
              </a>
            </li>
            <li>
              <a href="#policy" className="hover:text-yellow-500">
                Policy Ecosystem
              </a>
            </li>
            <li>
              <a href="#token" className="hover:text-yellow-500">
                Token
              </a>
            </li>
            <li>
              <a href="#lightpaper" className="hover:text-yellow-500">
                Light Paper
              </a>
            </li>
            <li>
              <a href="#ourteam" className="hover:text-yellow-500">
                Our Team
              </a>
            </li>
            <li>
              {userData?.role ? (
                <button className="bg-yellow-500 px-8 py-2 rounded-3xl text-black">
                  Login
                </button>
              ) : null}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Header;
