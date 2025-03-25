import ProfileBanner from '../../components/ProfileBanner/index.jsx';
import cert1 from "../../images/cert1.svg";
import cert2 from "../../images/cert2.svg";

const VetProfile = () => {
  return (
    <div className="bg-white p-[30px] pb-[90px]">
      <ProfileBanner name="Dr. Robert Steve" />
      <div className="px-[28px]">
        <div className="grid grid-cols-12 gap-6 min-h-screen">
          {/* Left Section (7 parts) */}
          <div className="col-span-7 ">
            <div className="space-y-2 text-gray-700">
              <p className="text-texttertiary text-[32px] leading-[53px]">
                Email Address: robert@gmail.com
              </p>
              <p className="text-texttertiary text-[32px] leading-[53px] mt-6">
                Contact Number: 876543210
              </p>
              <p className="text-texttertiary text-[32px] leading-[53px] mt-6">
                Address: Street - 234 North Poles, New Way, Germany
              </p>
              <p className="text-texttertiary text-[32px] leading-[53px] mt-6">
                Licence Number: 6314399433
              </p>
              <p className="text-texttertiary text-[32px] leading-[53px] mt-6">
                Specialization: Cardiologist
              </p>
              <p className="text-texttertiary text-[32px] leading-[53px] mt-6">
                Contract Base: Fulltime
              </p>
              <p className="text-texttertiary text-[32px] leading-[53px] mt-6">
                Birthday: 16th March 2025
              </p>
              <p className="text-texttertiary text-[32px] leading-[53px] mt-6">
                Language: English
              </p>
              <p className="text-texttertiary text-[32px] leading-[53px] mt-6">
                Health Insurance: English
              </p>
              <p className="text-texttertiary text-[32px] leading-[53px] mt-6">
                General Working Days/Hours: 40 Hours a Week
              </p>
              <p className="text-texttertiary text-[32px] leading-[53px] mt-6">
                Calendar Resource: 8
              </p>
              <p className="text-texttertiary text-[32px] leading-[53px] mt-6">
                Division: 8
              </p>
              <p className="text-texttertiary text-[32px] leading-[53px] mt-6">
                Note: ysty6r6
              </p>
            </div>
          </div>

          {/* Right Section (5 parts) */}
          <div className="col-span-5 ">
            <h2 className="text-texttertiary text-[32px] leading-[53px]">
              Certification and Documents
            </h2>
            <div className="grid grid-cols-2 gap-4 mt-7">
              <img src={cert1} alt="Certification 1" className="w-full"/>
              <img src={cert2} alt="Certification 2"  className="w-full"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default VetProfile;