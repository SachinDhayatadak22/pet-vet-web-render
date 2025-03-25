import React from 'react';
// import rocketBgImg from '../../images/services/rocket-bgimg.png'
// import crossIcon from "../../images/dataroom/fileDetails/cross-icon.svg";

const ServiceDetails = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
      <div className="fixed inset-0 flex items-center z-999 justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-[50%] mx-auto p-6 text-textcolor">
              <div className='flex justify-end'>
                  <button className="text-end" onClick={onClose}>
                      <img src={crossIcon} alt="Close" className='p-2' />
                  </button>
              </div>
              <div className="text-center mb-4">
                  <img src={rocketBgImg} alt="Service Icon" className="mx-auto" />
              </div>
              <h2 className="text-xl font-bold mb-2">{service.title}</h2>
              <p className="mb-4">{service.detailedDescription}</p>
              <div className='flex justify-between'>
                  <p className="font-bold text-lg mb-4">{service.price}</p>
                  <button className="bg-secondary text-white rounded-full px-4 py-2">Buy Now</button>
              </div>
          </div>
      </div>
  );
};
export default ServiceDetails;
