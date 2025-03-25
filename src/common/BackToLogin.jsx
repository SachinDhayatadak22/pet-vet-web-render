import React from "react";
import { useNavigate } from "react-router-dom";

const BackToLogin = ({ text = "Already have an account?" }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 text-center text-sm font-medium text-textgray">
      {text}
      <span
        onClick={() => navigate("/login/admin")}
        className="text-secondary cursor-pointer ml-1"
      >
        Sign In
      </span>
    </div>
  );
};

export default BackToLogin;