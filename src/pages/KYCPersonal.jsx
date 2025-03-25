import React, { useState } from 'react'
import KYCStepper from '../components/stepper/KYCStepper'

const KYCPersonal = () => {
    const [currentStep, setCurrentStep] = useState(1);
    return (
        <div className="m-3 lg:ml-0 bg-white rounded-lg">
            <div className='text-textcolor p-4'>
                <div>
                    <span className='text-xl font-semibold'>KYC Personal</span>
                    <div className=''>
                        <KYCStepper currentStep={currentStep} setCurrentStep={setCurrentStep}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KYCPersonal