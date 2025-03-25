import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StepThree = ({ currentStep, setCurrentStep, existingKYCDataStepThree, kycId }) => {
  const navigate = useNavigate();
  const [uploads, setUploads] = useState({
    passport: null,
    bankReference: null,
    residenceProof: null,
    signature: null,
  });

  const handleFileChange = (e, type) => {
    setUploads({
      ...uploads,
      [type]: e.target.files[0],
    });
  };

  return (
    <div className="max-w-full w-full bg-white rounded-lg p-4">
      {/* PEP Question */}
      <div className="mb-6">
        <label className="block font-medium mb-2 text-sm">
          Are you related to a person who holds a public function (PEP)?
        </label>
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="radio" name="pep" value="yes" />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="pep" value="no" />
            No
          </label>
        </div>
        <label className="block font-medium my-2 text-sm">
          If yes, please provide details for the person(s) who hold(s) a public function, with whom you are related
        </label>
        <textarea
          className="mt-4 w-full text-sm border-2 border-bordergray focus:outline-none rounded-lg p-2"
          rows="3"
          placeholder="If yes, please provide details for the person(s) who hold(s) a public function, with whom you are related"
        ></textarea>
      </div>

      {/* KYC Documentation Instructions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">KYC Documentation to be provided</h2>
        <ol className="list-decimal ml-5 text-sm mb-4">
          <li>Legible copy of passport(s) (inclusive of photograph, signature, and expiry date).</li>
          <li>A recently issued bank reference (not older than 6 months).</li>
          <li>
            Proof of current residential address (such as a utility bill or bank statement, not older than 3 months).
          </li>
        </ol>
        <p className="text-sm">
          <strong>Note:</strong> All KYC documents should be provided either in the form of originals or apostilled/notarised/certified
          true copies of the originals. Extra requirements can be mentioned in the Confirmation sheet or requested later. Please also
          read our KYC factsheet.
        </p>
      </div>

      {/* File Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["passport", "bankReference", "residenceProof", "signature"].map((type, index) => (
          <div
            key={index}
            className="border-2 border-dashed border-bordergray rounded-lg flex flex-col items-center p-4"
          >
            <label className="text-center mb-4">
              {type === "passport"
                ? "Upload Passport"
                : type === "bankReference"
                  ? "Upload Bank Reference"
                  : type === "residenceProof"
                    ? "Upload Residence Proof"
                    : "Upload Signature"}
            </label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, type)}
              className="hidden"
              id={type}
            />
            <label
              htmlFor={type}
              className="cursor-pointer bg-secondary text-white px-4 py-2 rounded-md"
            >
              Upload
            </label>
            {uploads[type] && (
              <span className="mt-2 text-sm text-green-600">
                {uploads[type].name}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Form Buttons */}
      <div className="flex justify-end mt-6">
        <div className="flex gap-4">
          <button className="bg-secondary text-sm text-white px-6 py-3 rounded-full mt-6"
            onClick={() => {
              setCurrentStep(2)
              navigate('/kyc-personal/step-two');
            }}
          >Back</button>
          <button className="bg-secondary text-sm text-white px-6 py-3 rounded-full mr-12 mt-6">
            Save and Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
