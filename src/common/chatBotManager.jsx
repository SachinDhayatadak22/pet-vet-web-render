import React, { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";

const ChatbotManager = () => {
  const location = useLocation();

  // Simulating user login status (you can replace it with Redux or context state)
  const isLoggedIn = localStorage.getItem("accesstoken")

  useEffect(() => {
      const excludedRoutes = ["/login", "/signup", "/forget-password", "/verify-otp/:token","/"];
      const currentPath = location.pathname;

      let observer = null;

      const removeAllChatbotElements = () => {
        console.log("Removing all chatbots...");

        // Remove the script if it exists
        const chatbotScriptId = "tawk-chatbot-script";
        const existingScript = document.getElementById(chatbotScriptId);
        if (existingScript) {
          existingScript.remove();
          console.log("Chatbot script removed.");
        }

        // Remove Tawk.to iframe(s) explicitly
        const tawkIframes = document.querySelectorAll("iframe[src*='tawk.to']");
        tawkIframes.forEach((iframe) => {
          iframe.remove();
          console.log("Tawk.to iframe removed.");
        });

        // Remove other dynamically rendered Tawk.to DOM elements
        const tawkContainers = document.querySelectorAll(".tawk-min-container");
        console.log("tawkContainers:", tawkContainers);

        tawkContainers.forEach((container) => {
          container.remove();
          console.log("Tawk.min-container removed.");
        });

        // Destroy Tawk.to widget via API if available
        if (window.Tawk_API && window.Tawk_API.destroy) {
          window.Tawk_API.destroy();
          console.log("Tawk API widget destroyed.");
        }
      };

      const observeAndRemoveChatbotElements = () => {
        // Set up a MutationObserver to detect dynamically added elements
        observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            const addedNodes = Array.from(mutation.addedNodes);
            addedNodes.forEach((node) => {
              if (node.nodeType === 1) {
                // Check if the added node matches the Tawk.to container
                const tawkContainer = node.querySelector(".tawk-min-container");
                if (tawkContainer) {
                  tawkContainer.remove();
                  console.log("Tawk.min-container dynamically removed.");
                }

                // Check if the added node is an iframe
                if (node.matches("iframe[src*='tawk.to']")) {
                  node.remove();
                  console.log("Tawk.to iframe dynamically removed.");
                }
              }
            });
          });
        });

        // Observe the body for changes
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      };

      const addChatbot = () => {
        console.log("Adding chatbot...");
        const chatbotScriptId = "tawk-chatbot-script";

        // Add script only if it doesn't exist
        if (!document.getElementById(chatbotScriptId)) {
          const script = document.createElement("script");
          script.id = chatbotScriptId;
          script.async = true;
          script.src = "https://embed.tawk.to/672b365c4304e3196addd196/1ic0con6m";
          script.charset = "UTF-8";
          script.setAttribute("crossorigin", "*");
          document.body.appendChild(script);
          console.log("Chatbot script added.");
        }

        // Show widget via Tawk API
        if (window.Tawk_API && window.Tawk_API.show) {
          window.Tawk_API.show();
          console.log("Tawk widget shown via API.");
        }
      };

      // Check if the current route is excluded or the user is logged in
      const isExcludedRoute = excludedRoutes.some((route) =>
        matchPath({ path: route, end: true }, currentPath)
      );

      // If the user is logged in, and not on an excluded route, show the chatbot
      if (isExcludedRoute || !isLoggedIn) {
        removeAllChatbotElements();
        observeAndRemoveChatbotElements();
      } else {
        if (observer) {
          observer.disconnect(); // Stop observing
          console.log("MutationObserver disconnected.");
        }
        addChatbot();
      }

      // Cleanup observer on component unmount
      return () => {
        if (observer) {
          observer.disconnect();
          console.log("MutationObserver cleaned up.");
        }
      };
    
  }, [location, isLoggedIn]);

  return null;
};

export default ChatbotManager;
