import React, { useState } from 'react';

const KYCBusinessStepOne = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    jurisdiction: '',
    officeAddress: '',
    registrationNo: '',
    incorporationDate: '',
    website: '',
    linkedin: '',
    directors: [''],
    shareholders: [''],
  });

  const [errors, setErrors] = useState({});

  // Helper function for validation
  const validateField = (field, value) => {
    let error = '';
    if (!value.trim()) {
      error = `${field} is required`;
    }
    return error;
  };

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData };

    if (type === 'directors' || type === 'shareholders') {
      updatedFormData[type][index] = value;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const addField = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: [...prevData[type], ''],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          if (!item.trim()) {
            newErrors[`${key}-${index}`] = `${key} is required`;
          }
        });
      } else {
        newErrors[key] = validateField(key, formData[key]);
      }
    });

    setErrors(newErrors);
    if (Object.values(newErrors).every((err) => err === '')) {
      // Form is valid, proceed to the next step
      console.log('Form data submitted:', formData);
    }
  };

  return (
    <form className="p-6 bg-white rounded-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className='text-sm'>Company Name <span className='text-red-600'> *</span></label>
          <input
            type="text"
            name="companyName"
            placeholder='Company Name'
            className="border-2 text-sm border-bordergray focus:border-secondary focus:outline-none p-2 rounded-lg w-full"
            value={formData.companyName}
            onChange={handleChange}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label className='text-sm'>Jurisdiction<span className='text-red-600'> *</span></label>
          <input
            type="text"
            name="jurisdiction"
            placeholder='Jurisdiction'
            className="border-2 text-sm border-bordergray focus:border-secondary focus:outline-none p-2 rounded-lg w-full"
            value={formData.jurisdiction}
            onChange={handleChange}
          />
          {errors.jurisdiction && (
            <p className="text-red-500 text-sm">{errors.jurisdiction}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className='text-sm'>Registered Office <span className='text-red-600'> *</span></label>
          <textarea
            name="officeAddress"
            placeholder='Registered Office'
            className="border-2 text-sm border-bordergray focus:border-secondary focus:outline-none p-2 rounded-lg w-full"
            value={formData.officeAddress}
            onChange={handleChange}
          ></textarea>
          {errors.officeAddress && (
            <p className="text-red-500 text-sm">{errors.officeAddress}</p>
          )}
        </div>

        <div>
          <label className='text-sm'>Registration No.<span className='text-red-600'> *</span></label>
          <input
            type="text"
            name="registrationNo"
            placeholder='Registration No.'
            className="border-2 text-sm border-bordergray focus:border-secondary focus:outline-none p-2 rounded-lg w-full"
            value={formData.registrationNo}
            onChange={handleChange}
          />
          {errors.registrationNo && (
            <p className="text-red-500 text-sm">{errors.registrationNo}</p>
          )}
        </div>

        <div>
          <label className='text-sm'>Date of Incorporation<span className='text-red-600'> *</span></label>
          <input
            type="date"
            name="incorporationDate"
            placeholder='Date of Incorporation'
            className="border-2 text-sm border-bordergray focus:border-secondary focus:outline-none p-2 rounded-lg w-full"
            value={formData.incorporationDate}
            onChange={handleChange}
          />
          {errors.incorporationDate && (
            <p className="text-red-500 text-sm">{errors.incorporationDate}</p>
          )}
        </div>

        <div>
          <label className='text-sm'>Website<span className='text-red-600'> *</span></label>
          <input
            type="url"
            name="website"
            placeholder='Website'
            className="border-2 text-sm border-bordergray focus:border-secondary focus:outline-none p-2 rounded-lg w-full"
            value={formData.website}
            onChange={handleChange}
          />
          {errors.website && (
            <p className="text-red-500 text-sm">{errors.website}</p>
          )}
        </div>

        <div>
          <label className='text-sm'>LinkedIn<span className='text-red-600'> *</span></label>
          <input
            type="url"
            name="linkedin"
            placeholder='LinkedIn'
            className="border-2 text-sm border-bordergray focus:border-secondary focus:outline-none p-2 rounded-lg w-full"
            value={formData.linkedin}
            onChange={handleChange}
          />
          {errors.linkedin && (
            <p className="text-red-500 text-sm">{errors.linkedin}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className='text-sm'>Full name(s) of the Director(s):<span className='text-red-600'> *</span></label>
        {formData.directors.map((director, index) => (
          <div key={index} className="flex items-center gap-2 mt-3">
            <input
              type="text"
              placeholder='Full name(s) of the Director(s)'
              className="border-2 text-sm border-bordergray focus:border-secondary focus:outline-none p-2 rounded-lg w-full"
              value={director}
              onChange={(e) => handleChange(e, index, 'directors')}
            />
            {errors[`directors-${index}`] && (
              <p className="text-red-500 text-sm">{errors[`directors-${index}`]}</p>
            )}
          </div>
        ))}
        <button
          type="button"
          className="mt-2 text-secondary"
          onClick={() => addField('directors')}
        >
          Add Director
        </button>
      </div>

      <div className="mt-4">
        <label className='text-sm'>Full name(s) of the Shareholder(s):<span className='text-red-600'> *</span></label>
        {formData.shareholders.map((shareholder, index) => (
          <div key={index} className="flex items-center gap-2 mt-3">
            <input
              type="text"
              placeholder='Full name(s) of the Shareholder(s)'
              className="border-2 text-sm border-bordergray focus:border-secondary focus:outline-none p-2 rounded-lg w-full"
              value={shareholder}
              onChange={(e) => handleChange(e, index, 'shareholders')}
            />
            {errors[`shareholders-${index}`] && (
              <p className="text-red-500 text-sm">
                {errors[`shareholders-${index}`]}
              </p>
            )}
          </div>
        ))}
        <button
          type="button"
          className="mt-2 text-secondary"
          onClick={() => addField('shareholders')}
        >
          Add Shareholder
        </button>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="bg-secondary text-white py-2 px-4 rounded-full"
        >
          Save and Next
        </button>
      </div>
    </form>
  );
};

export default KYCBusinessStepOne;
