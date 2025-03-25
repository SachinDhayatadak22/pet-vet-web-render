import React, { useEffect, useState } from 'react';
// import checkedIcon from '../../images/icon/green-checked-circle.svg';
// import greenCircle from '../../images/icon/green-circle.svg';
// import grayCircle from '../../images/icon/gray-circle.svg';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import KYCBusinessStepOne from '././kycBusiness/StepOne';
import { useLocation } from 'react-router-dom';
import { apiGET } from '../../utils/apiHelper';

const Stepper = ({ currentStep, setCurrentStep }) => {
    const { pathname } = useLocation();

    const steps = ["Step 1", "Step 2", "Final Step"];
    const [existingKYCDataStepOne, setExistingKYCDataStepOne] = useState(null);
    const [existingKYCDataStepTwo, setExistingKYCDataStepTwo] = useState(null);
    const [existingKYCDataStepThree, setExistingKYCDataStepThree] = useState(null);
    const [kycId, setKycId] = useState(null);

    const getKYCPersonalData = async () => {
        // setIsLoading(true);
        try {
            const response = await apiGET("/v1/kyc-personal");
            console.log(response.data.data.stepThree);

            if (response.status === 200) {
                setExistingKYCDataStepOne(response.data.data.stepOne);
                setExistingKYCDataStepTwo(response.data.data.stepTwo);
                setExistingKYCDataStepThree(response.data.data.stepThree);
                setKycId(response.data.data.id)
            }
        } catch (error) {
            console.log(error);
        } finally {
            // setIsLoading(false);
        };
    }

    useEffect(() => {
        getKYCPersonalData();
    }, [currentStep]);

    return (
        <div>
            <div className="flex items-center px-4 w-1/2">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col ">
                        {/* Step Circle and Label */}
                        <div className="mt-2 text-sm font-medium">{step}</div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 mt-4 flex items-center justify-center">
                                <img
                                    src={index <= currentStep - 1 ? checkedIcon : grayCircle}
                                    alt={index <= currentStep ? 'completed' : 'pending'}
                                    className="w-full h-full"
                                />
                            </div>

                            {/* Connecting Line */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`h-1 w-32 mt-4 bg-gray-300
                            ${index < currentStep ? 'bg-[#37C12B]' : 'bg-primary'}`}
                                ></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {
                pathname === "/kyc-personal/step-one" &&
                <StepOne currentStep={currentStep} setCurrentStep={setCurrentStep} existingKYCDataStepOne={existingKYCDataStepOne} kycId={kycId} />
            }
            {
                pathname === "/kyc-personal/step-two" &&
                <StepTwo currentStep={currentStep} setCurrentStep={setCurrentStep} existingKYCDataStepTwo={existingKYCDataStepTwo} kycId={kycId} />
            }
            {
                pathname === "/kyc-personal/step-three" &&
                <StepThree currentStep={currentStep} setCurrentStep={setCurrentStep} existingKYCDataStepThree={existingKYCDataStepThree} kycId={kycId} />
            }
            {
                currentStep === 1 && pathname === "/kyc-business/step-one" &&
                <KYCBusinessStepOne currentStep={currentStep} setCurrentStep={setCurrentStep} />
            }
            {
                currentStep === 2 && pathname === "/kyc-business/step-two" &&
                <StepTwo currentStep={currentStep} setCurrentStep={setCurrentStep} />
            }
            {
                currentStep === 3 && pathname === "/kyc-business/step-three" &&
                <StepThree currentStep={currentStep} setCurrentStep={setCurrentStep} />
            }
        </div>
    );
};

export default Stepper;
