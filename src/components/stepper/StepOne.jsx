import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPUT } from '../../utils/apiHelper';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { AiFillEdit } from 'react-icons/ai';

const initialData = {
    firstName: '',
    middleName: '',
    lastName: '',
    residentialAddress: '',
    dateOfBirth: '',
    placeOfBirth: '',
    businessAddress: '',
    correspondence: '',
    address: '',
    passportNumber: '',
    countryOfIssue: '',
    expiryDate: '',
    dualCitizenship: '',
    dualCountryOfIssue: '',
    dualExpiryDate: '',
}

const StepOne = ({ currentStep, setCurrentStep, existingKYCDataStepOne, kycId }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialData);
    const [isEditable, setIsEditable] = useState(false);
    const [errors, setErrors] = useState({});

    const nameRegex = /^[a-zA-Z\s]+$/;
    const alphanumericRegex = /^[A-Z0-9]+$/;


    const toggleEditMode = () => {
        setIsEditable(!isEditable);
    };

    const handleSubmit = async (e) => {
        if (!isEditable) {
            setCurrentStep(2);
            navigate('/kyc-personal/step-two');
            return;
        }
        e.preventDefault();
        let formIsValid = true;
        const newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key] && key !== 'middleName' && key !== 'dualCitizenship' && key !== 'dualCountryOfIssue' && key !== 'dualExpiryDate') {
                newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
                formIsValid = false;
            }
        });
        setErrors(newErrors);

        if (formIsValid) {
            let payload = formData
            console.log(payload);

            try {
                const response = await apiPUT(`/v1/kyc-personal/step-one/update/${kycId}`, payload);
                console.log(response);
                if (response.status === 200) {
                    toast.success("KYC details updated successfully");
                    setCurrentStep(2);
                    navigate('/kyc-personal/step-two');
                } else {
                    toast.error("Failed to update KYC details")
                }
            } catch (error) {
                console.log(error);
                toast.error("Error while updating KYC details!");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = '';

        switch (name) {
            case 'firstName':
                if (!value.trim()) error = 'First name cannot be empty';
                else if (!nameRegex.test(value)) error = 'First name must only contain letters and spaces';
                break;
            case 'middleName':
                if (!value.trim()) error = 'Middle name cannot be empty';
                else if (!nameRegex.test(value)) error = 'Middle name must only contain letters and spaces';
                break;
            case 'lastName':
                if (!value.trim()) error = 'Last name cannot be empty';
                else if (!nameRegex.test(value)) error = 'Last name must only contain letters and spaces';
                break;
            case 'residentialAddress':
                if (!value.trim()) error = 'Residential address cannot be empty';
                break;
            case 'dateOfBirth':
                if (!value) error = 'Date of birth is required';
                break;
            case 'placeOfBirth':
                if (!value.trim()) error = 'Place of birth cannot be empty';
                break;
            case 'businessAddress':
                if (!value.trim()) error = 'Business address cannot be empty';
                break;
            case 'correspondence':
                if (!value.trim()) error = 'Correspondence cannot be empty';
                break;
            case 'address':
                if (!value.trim()) error = 'Address cannot be empty';
                break;
            case 'passportNumber':
                if (!value.trim()) error = 'Passport/ID card number cannot be empty';
                else if (!alphanumericRegex.test(value)) error = 'Passport/ID card number must contain only uppercase letters and numbers';
                break;
            case 'countryOfIssue':
                if (!value.trim()) error = 'Country of issue cannot be empty';
                else if (!nameRegex.test(value)) error = 'Country of issue must only contain letters and spaces';
                break;
            case 'expiryDate':
                if (!value) error = 'Expiry date is required';
                break;
            case 'dualCitizenship':
                if (value && !alphanumericRegex.test(value)) error = 'Dual passport number must contain only uppercase letters and numbers';
                break;
            case 'dualCountryOfIssue':
                if (value && !nameRegex.test(value)) error = 'Dual country of issue must only contain letters and spaces';
                break;
            case 'dualExpiryDate':
                if (value && !value.trim()) error = 'Dual expiry date cannot be empty if provided';
                break;
            default:
                break;
        }

        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: error });
    };

    useEffect(() => {
        if (existingKYCDataStepOne) {
            setFormData((prevData) => ({
                ...prevData,
                ...existingKYCDataStepOne,
                dateOfBirth: existingKYCDataStepOne.dateOfBirth
                    ? dayjs(existingKYCDataStepOne.dateOfBirth).format("YYYY-MM-DD")
                    : "",
                expiryDate: existingKYCDataStepOne.expiryDate
                    ? dayjs(existingKYCDataStepOne.expiryDate).format("YYYY-MM-DD")
                    : "",
                dualExpiryDate: existingKYCDataStepOne.dualExpiryDate
                    ? dayjs(existingKYCDataStepOne.dualExpiryDate).format("YYYY-MM-DD")
                    : "",
            }));
        }
    }, [existingKYCDataStepOne]);

    return (
        <div>
            <div className='text-end mr-10'>
                <button className='px-4 py-2 bg-secondary rounded-full text-sm text-white'>
                    <div className='flex justify-center items-center gap-2'
                        onClick={toggleEditMode}
                    >
                        <AiFillEdit className="cursor-pointer" />Edit
                    </div>
                </button>
            </div>
            <div className="flex justify-center">
                <div className="max-w-full w-full bg-white rounded-lg p-4">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Fields */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                                <span className={`${isEditable ? "text-sm" : "text-base font-medium"}`}>First Name <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                                {
                                    isEditable ? <>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                        />
                                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                                    </>
                                        : <span className='inline-block'>&nbsp;: {formData.firstName}</span>
                                }
                            </div>
                            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Middle Name <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                                {
                                    isEditable ? <>
                                        <input
                                            type="text"
                                            name="middleName"
                                            placeholder="Middle Name"
                                            value={formData.middleName}
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                        />
                                        {errors.middleName && <p className="text-red-500 text-sm">{errors.middleName}</p>}
                                    </>
                                        : <span className='inline-block'>&nbsp;: {formData.middleName}</span>
                                }
                            </div>
                            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Last Name <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                                {
                                    isEditable ? <>
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                        />
                                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                                    </>
                                        : <span className='inline-block'>&nbsp;: {formData.lastName}</span>
                                }
                            </div>
                        </div>

                        {/* Address and Date Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Residential Address <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                                {
                                    isEditable ? <>
                                        <input
                                            type="text"
                                            name="residentialAddress"
                                            placeholder="Residential Address"
                                            value={formData.residentialAddress}
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                        />
                                        {errors.residentialAddress && <p className="text-red-500 text-sm">{errors.residentialAddress}</p>}
                                    </>
                                        : <span className='inline-block'>&nbsp;: {formData.residentialAddress}</span>
                                }
                            </div>

                            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Date Of Birth<span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                                {
                                    isEditable ? <>
                                        <input
                                            type="text"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                        />
                                        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                                    </>
                                        : <span className='inline-block'>&nbsp;: {formData.dateOfBirth}</span>
                                }
                            </div>

                            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Place Of Birth<span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                                {
                                    isEditable ? <>
                                        <input
                                            type="text"
                                            name="placeOfBirth"
                                            placeholder="Place Of Birth"
                                            value={formData.placeOfBirth}
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                        />
                                        {errors.placeOfBirth && <p className="text-red-500 text-sm">{errors.placeOfBirth}</p>}
                                    </>
                                        : <span className='inline-block'>&nbsp;: {formData.placeOfBirth}</span>
                                }
                            </div>
                        </div>

                        {/* Business and Correspondence Address */}
                        <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                            <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Business Address<span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                            {
                                isEditable ? <>
                                    <input
                                        type="text"
                                        name="businessAddress"
                                        placeholder="Business Address"
                                        value={formData.businessAddress}
                                        onChange={handleChange}
                                        readOnly={!isEditable}
                                        className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                    />
                                    {errors.businessAddress && <p className="text-red-500 text-sm">{errors.businessAddress}</p>}
                                </>
                                    : <span className='inline-block'>&nbsp;: {formData.businessAddress}</span>
                            }
                        </div>
                        <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                            <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Correspondence <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                            {
                                isEditable ? <>
                                    <input
                                        type="text"
                                        name="correspondence"
                                        placeholder="Correspondence"
                                        value={formData.correspondence}
                                        onChange={handleChange}
                                        readOnly={!isEditable}
                                        className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                    />
                                    {errors.correspondence && <p className="text-red-500 text-sm">{errors.correspondence}</p>}
                                </>
                                    : <span className='inline-block'>&nbsp;: {formData.correspondence}</span>
                            }
                        </div>
                        <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                            <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Address <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                            {
                                isEditable ? <>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        readOnly={!isEditable}
                                        className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                    />
                                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                                </>
                                    : <span className='inline-block'>&nbsp;: {formData.address}</span>
                            }
                        </div>

                        {/* Passport Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Passport/ID <br /> Card Number <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                                {
                                    isEditable ? <>
                                        <input
                                            type="text"
                                            name="passportNumber"
                                            placeholder="Passport/ID Card Number"
                                            value={formData.passportNumber}
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                        />
                                        {errors.passportNumber && <p className="text-red-500 text-sm">{errors.passportNumber}</p>}
                                    </>
                                        : <span className='inline-block'>&nbsp;: {formData.passportNumber}</span>
                                }
                            </div>

                            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Country of Issue <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                                {
                                    isEditable ? <>
                                        <input
                                            type="text"
                                            name="countryOfIssue"
                                            placeholder="Country of Issue"
                                            value={formData.countryOfIssue}
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                        />
                                        {errors.countryOfIssue && <p className="text-red-500 text-sm">{errors.countryOfIssue}</p>}
                                    </>
                                        : <span className='inline-block'>&nbsp;: {formData.countryOfIssue}</span>
                                }
                            </div>
                            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Expiry Date <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                                {
                                    isEditable ? <>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                        />
                                        {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
                                    </>
                                        : <span className='inline-block'>&nbsp;: {formData.expiryDate}</span>
                                }
                            </div>
                        </div>

                        {/* Dual Citizenship */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>If Dual Citizenship <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                                {
                                    isEditable ? <>
                                        <input
                                            type="text"
                                            name="dualCitizenship"
                                            placeholder="Passport/ID Card Number"
                                            value={formData.dualCitizenship}
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                        />
                                        {errors.dualCitizenship && <p className="text-red-500 text-sm">{errors.dualCitizenship}</p>}
                                    </>
                                        : <span className='inline-block'>&nbsp;: {formData.dualCitizenship}</span>
                                }
                            </div>
                            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Country of Issue <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                                {
                                    isEditable ? <>
                                        <input
                                            type="text"
                                            name="dualCountryOfIssue"
                                            placeholder="Country of Issue"
                                            value={formData.dualCountryOfIssue}
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                        />
                                        {errors.dualCountryOfIssue && <p className="text-red-500 text-sm">{errors.dualCountryOfIssue}</p>}
                                    </>
                                        : <span className='inline-block'>&nbsp;: {formData.dualCountryOfIssue}</span>
                                }
                            </div>
                            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Expiry Date <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                                {
                                    isEditable ? <>
                                        <input
                                            type="text"
                                            name="dualExpiryDate"
                                            value={formData.dualExpiryDate}
                                            onChange={handleChange}
                                            readOnly={!isEditable}
                                            className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                                        />
                                        {errors.dualExpiryDate && <p className="text-red-500 text-sm">{errors.dualExpiryDate}</p>}
                                    </>
                                        : <span className='inline-block'>&nbsp;: {formData.dualExpiryDate}</span>
                                }
                            </div>
                        </div>

                        <div className='flex justify-end'>
                            <button
                                type="submit"
                                className="bg-secondary text-sm text-white px-6 py-3 rounded-full mr-12 mt-6"
                            >
                                {isEditable ? "Save and Next" : "Next"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StepOne;