import ProfileBanner from '../../components/ProfileBanner/index.jsx';
import UpdateProfile from '../../components/ClinicalProfile/index.jsx';
import AboutClinic from '../../components/AboutClinic/index.jsx';
import ClinicService from '../../components/ClinicService/index.jsx';
import VetAddress from '../../components/VetAddress/index.jsx';

const ClinicalProfile = () => {
  return (
    <div className="bg-white p-[30px] pb-[90px]">
      <ProfileBanner name="Roman Clinic"/>
      <div className="px-[28px]">
        <UpdateProfile/>
        <AboutClinic />
        <VetAddress/>
        <ClinicService />
      </div>
    </div>
  )
}


export default ClinicalProfile;