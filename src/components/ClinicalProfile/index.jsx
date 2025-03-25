import React from 'react';
import Separator from '../Seperator/index.jsx';

const ProfileSection = ({ title, subtitle, children }) => {
  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-[24px] font-medium">{title}</h2>
          {subtitle && (
            <p className="text-textColor2 text-[18px] font-normal">
              {subtitle}
            </p>
          )}
        </div>
        <div>{children}</div>
      </div>
      <Separator />
    </>
  );
};

const UpdateProfile = () => {
  return (
    <ProfileSection
      title="Clinic Profile"
      subtitle="Update your clinic photo and profile"
    >
      <button className="mr-8 px-6 py-3 bg-white  rounded-[12px] border-bordergray text-texttertiary text-[16px] font-medium border">
        Cancel
      </button>
      <button className="px-6 py-3 bg-secondary  rounded-[12px] border-bordergray text-white text-[16px] font-medium border">
        Save Changes
      </button>
    </ProfileSection>
  );
};

export default UpdateProfile;
