import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPUT } from '../../utils/apiHelper';
import { toast } from 'react-toastify';
import { AiFillEdit } from 'react-icons/ai';
import dayjs from 'dayjs';

const initialData = {
  educationalStatus: '',
  employersName: '',
  occupationAndPosition: '',
  maritalStatus: '',
  nameOfSpouse: '',
  workTel: '',
  homeTel: '',
  mobileTel: '',
  fax: '',
  primaryEmail: '',
  secondaryEmail: '',
  dateAppointment: '',
  isPublicProminentFunctionPEP: false,
}

const StepTwo = ({ currentStep, setCurrentStep, existingKYCDataStepTwo, kycId }) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [isEditable, setIsEditable] = useState(false);
  const [errors, setErrors] = useState({});

  const nameRegex = /^[a-zA-Z\s]+$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$|^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  console.log(existingKYCDataStepTwo);


  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  const handleSubmit = async (e) => {
    console.log("dads");

    if (!isEditable) {
      setCurrentStep(3);
      navigate('/kyc-personal/step-three');
      return;
    }
    e.preventDefault();
    let formIsValid = true;
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== 'publicFunction' && key !== 'dateAppointment' && key !== 'isPublicProminentFunctionPEP') {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
        formIsValid = false;
      }
    });
    setErrors(newErrors);
    console.log(formIsValid);
    console.log(formData);

    if (formIsValid) {
      let payload = formData
      console.log(payload);

      try {
        const response = await apiPUT(`/v1/kyc-personal/step-two/update/${kycId}`, payload);
        console.log(response);
        if (response.status === 200) {
          toast.success("KYC details updated successfully");
          setCurrentStep(2);
          navigate('/kyc-personal/step-three');
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
    let type = "text";
    const inputValue = type === 'checkbox' ? checked : value;

    switch (name) {
      case 'educationalStatus':
        if (!inputValue.trim()) error = 'Educational status cannot be empty';
        break;
      case 'employersName':
        if (!inputValue.trim()) error = 'Employer name cannot be empty';
        else if (!nameRegex.test(inputValue)) error = 'Employer name must only contain letters and spaces';
        break;
      case 'occupationAndPosition':
        if (!inputValue.trim()) error = 'occupationAndPosition cannot be empty';
        break;
      case 'maritalStatus':
        if (!inputValue.trim()) error = 'Marital status cannot be empty';
        break;
      case 'nameOfSpouse':
        if (inputValue && !nameRegex.test(inputValue)) error = 'Spouse name must only contain letters and spaces';
        break;
      case 'workTel':
      case 'homeTel':
      case 'mobileTel':
      case 'fax':
        if (inputValue && !phoneRegex.test(inputValue)) error = `${name} must be a valid phone number`;
        break;
      case 'primaryEmail':
      case 'secondaryEmail':
        if (!inputValue.trim()) error = `${name === 'primaryEmail' ? 'Primary email' : 'Secondary email'} cannot be empty`;
        else if (!emailRegex.test(inputValue)) error = 'Please enter a valid email address';
        break;
      case 'isPublicProminentFunctionPEP':
        if (typeof inputValue !== 'boolean') error = 'PEP status must be a boolean';
        break;
      case 'publicFunction':
        if (inputValue && !inputValue.trim()) error = 'Public function cannot be empty if provided';
        break;
      case 'dateAppointment':
        if (!inputValue) error = 'Date of appointment is required';
        break;
      default:
        break;
    }

    setFormData({ ...formData, [name]: inputValue });
    setErrors({ ...errors, [name]: error });
  };


  useEffect(() => {
    if (existingKYCDataStepTwo) {
      setFormData((prevData) => ({
        ...prevData,
        ...existingKYCDataStepTwo,
        dateAppointment: existingKYCDataStepTwo.dateAppointment
          ? dayjs(existingKYCDataStepTwo.dateAppointment).format("YYYY-MM-DD")
          : "",
      }));
    }
  }, [existingKYCDataStepTwo]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentStep(1);
    };
    window.onpopstate = handlePopState;
    // Cleanup the effect when the component is unmounted or on re-render
    // return () => {
    //   window.onpopstate = null;
    // };
  }, [currentStep, setCurrentStep]);

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

      <div className="flex items-center justify-center">
        <div className="max-w-full w-full bg-white rounded-lg p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Educational Status */}
            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
              <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Educational Status <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
              {
                isEditable ? <>
                  <input
                    type="text"
                    name="educationalStatus"
                    placeholder="Educational Status"
                    value={formData.educationalStatus}
                    onChange={(e) => handleChange(e)}
                    readOnly={!isEditable}
                    className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                  />
                  {errors.educationalStatus && <p className="text-red-500 text-sm">{errors.educationalStatus}</p>}
                </>
                  : <span className='inline-block'>&nbsp;: {formData.educationalStatus}</span>
              }
            </div>

            {/* Employer Name, OccupationAndPosition, Marital Status */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Employer’s Name <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                {
                  isEditable ? <>
                    <input
                      type="text"
                      name="employersName"
                      placeholder="Employer’s Name"
                      value={formData.employersName}
                      onChange={(e) => handleChange(e)}
                      readOnly={!isEditable}
                      className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                    />
                    {errors.employersName && <p className="text-red-500 text-sm">{errors.employersName}</p>}
                  </>
                    : <span className='inline-block'>&nbsp;: {formData.employersName}</span>
                }
              </div>

              <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Occupation/Position <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                {
                  isEditable ? <>
                    <input
                      type="text"
                      name="occupationAndPosition"
                      placeholder="Occupation/Position"
                      value={formData.occupationAndPosition}
                      onChange={(e) => handleChange(e)}
                      readOnly={!isEditable}
                      className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                    />
                    {errors.occupationAndPosition && <p className="text-red-500 text-sm">{errors.occupationAndPosition}</p>}
                  </>
                    : <span className='inline-block'>&nbsp;: {formData.occupationAndPosition}</span>
                }
              </div>

              <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Marital Status <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                {
                  isEditable ? <>
                    <input
                      type="text"
                      name="maritalStatus"
                      placeholder="Marital Status"
                      value={formData.maritalStatus}
                      onChange={(e) => handleChange(e)}
                      readOnly={!isEditable}
                      className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                    />
                    {errors.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus}</p>}
                  </>
                    : <span className='inline-block'>&nbsp;: {formData.maritalStatus}</span>
                }
              </div>
            </div>

            {/* Spouse Name, Work Tel, Home Tel */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Name of Spouse <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                {
                  isEditable ? <>
                    <input
                      type="text"
                      name="nameOfSpouse"
                      placeholder="Name of Spouse"
                      value={formData.nameOfSpouse}
                      onChange={(e) => handleChange(e)}
                      readOnly={!isEditable}
                      className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                    />
                    {errors.nameOfSpouse && <p className="text-red-500 text-sm">{errors.nameOfSpouse}</p>}
                  </>
                    : <span className='inline-block'>&nbsp;: {formData.nameOfSpouse}</span>
                }
              </div>

              <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Work Tel <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                {
                  isEditable ? <>
                    <input
                      type="text"
                      name="workTel"
                      placeholder="Work Tel"
                      value={formData.workTel}
                      onChange={(e) => handleChange(e)}
                      readOnly={!isEditable}
                      className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                    />
                    {errors.workTel && <p className="text-red-500 text-sm">{errors.workTel}</p>}
                  </>
                    : <span className='inline-block'>&nbsp;: {formData.workTel}</span>
                }
              </div>

              <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Home Tel <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                {
                  isEditable ? <>
                    <input
                      type="text"
                      name="homeTel"
                      placeholder="Home Tel"
                      value={formData.homeTel}
                      onChange={(e) => handleChange(e)}
                      readOnly={!isEditable}
                      className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                    />
                    {errors.homeTel && <p className="text-red-500 text-sm">{errors.homeTel}</p>}
                  </>
                    : <span className='inline-block'>&nbsp;: {formData.homeTel}</span>
                }
              </div>
            </div>

            {/* Mobile Tel, Fax */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-[32.5%]`}>
                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Mobile Tel <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                {
                  isEditable ? <>
                    <input
                      type="text"
                      name="mobileTel"
                      placeholder="Mobile Tel"
                      value={formData.mobileTel}
                      onChange={(e) => handleChange(e)}
                      readOnly={!isEditable}
                      className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                    />
                    {errors.mobileTel && <p className="text-red-500 text-sm">{errors.mobileTel}</p>}
                  </>
                    : <span className='inline-block'>&nbsp;: {formData.mobileTel}</span>
                }
              </div>

              <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-[32.5%]`}>
                <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Fax <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                {
                  isEditable ? <>
                    <input
                      type="text"
                      name="fax"
                      placeholder="Fax"
                      value={formData.fax}
                      onChange={(e) => handleChange(e)}
                      readOnly={!isEditable}
                      className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                    />
                    {errors.fax && <p className="text-red-500 text-sm">{errors.fax}</p>}
                  </>
                    : <span className='inline-block'>&nbsp;: {formData.fax}</span>
                }
              </div>
            </div>

            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
              <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Primary Email <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
              {
                isEditable ? <>
                  <input
                    type="text"
                    name="primaryEmail"
                    placeholder="Primary Email"
                    value={formData.primaryEmail}
                    onChange={(e) => handleChange(e)}
                    readOnly={!isEditable}
                    className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                  />
                  {errors.primaryEmail && <p className="text-red-500 text-sm">{errors.primaryEmail}</p>}
                </>
                  : <span className='inline-block'>&nbsp;: {formData.primaryEmail}</span>
              }
            </div>

            <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
              <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Secondary Email <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
              {
                isEditable ? <>
                  <input
                    type="text"
                    name="secondaryEmail"
                    placeholder="Secondary Email"
                    value={formData.secondaryEmail}
                    onChange={(e) => handleChange(e)}
                    readOnly={!isEditable}
                    className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                  />
                  {errors.secondaryEmail && <p className="text-red-500 text-sm">{errors.secondaryEmail}</p>}
                </>
                  : <span className='inline-block'>&nbsp;: {formData.secondaryEmail}</span>
              }
            </div>

            {/* PEP Status */}
            <div className="flex flex-col w-full">
              <span className={`${isEditable ? "text-sm " : "text-base"}`}>Have you been entrusted with a public prominent function (PEP)?</span>
              <div className="flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublicProminentFunctionPEP"
                    checked={formData.isPublicProminentFunctionPEP}
                    onChange={(e) => handleChange(e)}
                    className="mr-2"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPublicProminentFunctionPEP"
                    checked={!formData.isPublicProminentFunctionPEP}
                    onChange={() =>
                      setFormData({ ...formData, isPublicProminentFunctionPEP: !formData.isPublicProminentFunctionPEP })
                    }
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Public Function and Date of Appointment (if PEP) */}
            {formData.isPublicProminentFunctionPEP && (
              <div className='flex flex-col gap-4'>
                <span className={`${isEditable ? "text-sm " : "text-base"}`}>If yes, please provide your public function and date of appointment</span>
                <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                  <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Public Function <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                  {
                    isEditable ? <>
                      <input
                        type="text"
                        name="publicFunction"
                        placeholder="Public Function"
                        value={formData.publicFunction}
                        onChange={(e) => handleChange(e)}
                        readOnly={!isEditable}
                        className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                      />
                      {errors.publicFunction && <p className="text-red-500 text-sm">{errors.publicFunction}</p>}
                    </>
                      : <span className='inline-block'>&nbsp;: {formData.publicFunction}</span>
                  }
                </div>
                <div className={`flex ${isEditable ? "flex-col" : "flex-row"} w-full`}>
                  <span className={`${isEditable ? "text-sm " : "text-base font-medium"}`}>Date of Appointment <span className={`text-red-600 ${isEditable ? "visible" : "hidden"}`}> *</span></span>
                  {
                    isEditable ? <>
                      <input
                        type="date"
                        name="dateAppointment"
                        value={formData.dateAppointment}
                        onChange={(e) => handleChange(e)}
                        readOnly={!isEditable}
                        className="border-2 border-bordergray text-sm p-2 rounded-lg w-full focus:outline-none focus:border-secondary"
                      />
                      {errors.dateAppointment && <p className="text-red-500 text-sm">{errors.dateAppointment}</p>}
                    </>
                      : <span className='inline-block'>&nbsp;: {formData.dateAppointment}</span>
                  }
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-secondary text-sm text-white px-6 py-3 rounded-full mt-6"
                onClick={() => {
                  setCurrentStep(1)
                  navigate('/kyc-personal/step-one');
                }
                }
              >
                Back
              </button>
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

export default StepTwo;
