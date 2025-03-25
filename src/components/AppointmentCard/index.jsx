import marginDownIcon from "../../images/icon/margindown.svg";
import pawAppointment from '../../images/icon/pawappoint.svg';
const AppointmentCard = () => {
  return (
    <>
      <div className="bg-white p-4 rounded-[12px] shadow-md border">
        <h3 className="text-[14px] font-semibold leading-[15px] flex items-center gap-1 text-[#4C4D51] mb-[17px] font-poppins">
          <span><img src={pawAppointment} alt="pet appointment icon"/></span> Total Appointments
        </h3>
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-3xl font-bold mt-2 mb-2">128</p>
            <p className="text-gray-500 text-sm">56 More than Yesterday</p>
          </div>

          <span className="bg-[#EF444433] text-black text-xs px-[8px] py-[6px] rounded-[5px] flex gap-2 font-semibold">
             <img src={marginDownIcon} alt="margin down icon" />+2.14%
          </span>
        </div>
      </div>
    </>
  );
};

export default AppointmentCard;
