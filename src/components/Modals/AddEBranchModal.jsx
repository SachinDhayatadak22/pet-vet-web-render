import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import crossIcon from "../../images/dataroom/fileDetails/cross-icon.svg";

const AddEBranchModal = ({ isOpen, closeModal }) => {
    const modalRef = useRef();

    const [formData, setFormData] = useState({
        ebranchName: '',
        location: '',
        adminEmail: '',
        password: ''
    });

    const [passwordVisible, setPasswordVisible] = useState(false);

    const [errors, setErrors] = useState({
        ebranchName: '',
        location: '',
        adminEmail: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const validateForm = () => {
        const { ebranchName, location, adminEmail, password } = formData;
        let isValid = true;
        const newErrors = {};

        if (!ebranchName) {
            newErrors.ebranchName = 'Ebranch name is required.';
            isValid = false;
        }
        if (!location) {
            newErrors.location = 'Location is required.';
            isValid = false;
        }
        if (!adminEmail || !/\S+@\S+\.\S+/.test(adminEmail)) {
            newErrors.adminEmail = 'Please enter a valid email address.';
            isValid = false;
        }
        if (!password || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long, include a letter and a number.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted:", formData);
            closeModal();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, closeModal]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex z-999 items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-125 shadow-lg text-textcolor" ref={modalRef}>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className="text-lg font-semibold">
                        Add E-Branch
                    </h2>
                    <img
                        src={crossIcon}
                        alt="Close Icon"
                        className="w-5 h-5 cursor-pointer"
                        onClick={() => closeModal()}
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">E-Branch Name</label>
                        <input
                            type="text"
                            name="ebranchName"
                            value={formData.ebranchName}
                            onChange={handleChange}
                            className="w-full p-2 border-2 border-bordergray focus:outline-none rounded-lg bg-gray-100 focus:border-secondary"
                        />
                        {errors.ebranchName && <p className="text-red-500 text-sm">{errors.ebranchName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-2 border-2 border-bordergray focus:outline-none rounded-lg bg-gray-100 focus:border-secondary"
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Admin Email</label>
                        <input
                            type="email"
                            name="adminEmail"
                            value={formData.adminEmail}
                            onChange={handleChange}
                            className="w-full p-2 border-2 border-bordergray focus:outline-none rounded-lg bg-gray-100 focus:border-secondary"
                        />
                        {errors.adminEmail && <p className="text-red-500 text-sm">{errors.adminEmail}</p>}
                    </div>
                    {/* <div className="mb-4">
                        <label className="block mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border-2 border-bordergray focus:outline-none rounded-lg bg-gray-100 focus:border-secondary"
                            />
                            <span
                                className="absolute right-3 top-3 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <AiOutlineEyeInvisible size={20}/> : <AiOutlineEye size={20}/>}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div> */}

                    <div className="flex justify-end gap-2">
                        <button
                            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg"
                            type="button"
                            onClick={() => closeModal()}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-secondary text-white px-4 rounded-full"
                            type="submit"
                        >
                            Add E-Branch
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEBranchModal;
