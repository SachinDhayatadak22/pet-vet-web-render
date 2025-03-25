import React, { useEffect, useState } from 'react';
// import chatImage from '../../public/Chat_SVG.png';
import { useLocation } from 'react-router-dom';

const ChatBotManager2 = () => {
  const excludedRoutes = ['/login', '/signup','/','/forget-password','/verify-code/:id'];

  const [shouldRenderChatBot, setShouldRenderChatBot] = useState(false);
  const isLoggedIn = localStorage.getItem("accesstoken")
  let currentPath = window.location.pathname;
  const location = useLocation();

  useEffect(() => {
    currentPath = window.location.pathname;
    if (!excludedRoutes.includes(currentPath)) {
      var Tawk_API = window.Tawk_API || {},
        Tawk_LoadStart = new Date();
      var s1 = document.createElement('script'),
        s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/672b365c4304e3196addd196/1ic0con6m';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
      if (isLoggedIn) {
        setShouldRenderChatBot(true)
      }else{
        setShouldRenderChatBot(false)
      }
    }

  }, [isLoggedIn,location]);
  const toggleChat = () => {
    if (window.Tawk_API && window.Tawk_API.toggle) {
      window.Tawk_API.toggle();
    } else {
      console.error('Tawk.to widget is not loaded yet.');
    }
  };
  return (
    <div className="fixed bottom-4 right-3">
      {shouldRenderChatBot && (
        <button onClick={toggleChat} className="rounded-full">
          {/* <img src={chatImage} alt="Chatbot" className="w-14 h-14 me-3" /> */}
        </button>
      )}
    </div>
  );
};

export default ChatBotManager2;
