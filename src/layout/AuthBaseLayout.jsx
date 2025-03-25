// AuthLayout.js
import React from 'react';
import authBanner from '../images/authentication/authBanner.png'
const AuthBaseLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-900 overflow-hidden">
            <div className="hidden md:block md:w-1/2 bg-cover bg-top" style={{ backgroundImage: `url(${authBanner})` }}></div>
            <div className="flex w-full md:w-1/2 bg-white">
                <div className="w-full max-w-full max-h-screen overflow-auto">
                  {children}
                </div>
            </div>
        </div>
    );
};

export default AuthBaseLayout;
