import multiUsericon from "../../images/icon/multiuser.svg";
import activeBirthdayIcon from "../../images/icon/activebirthday.svg";
import upcomingBirthdayIcon from "../../images/icon/upcominguserbirthdayicon.svg";

const EmpBirth = () => {
  return (
    <>
      <div className="bg-white p-4 rounded-[12px] shadow-md border">
        <h3 className="text-[14px] font-semibold leading-[15px] flex items-center gap-1 text-[#4C4D51] mb-[17px] font-poppins">
          <span>
            <img src={multiUsericon} alt="multi user icons" />
          </span> Employee Birthdays
        </h3>
        <ul className="mt-2 text-gray-600 space-y-1 flex flex-col gap-[10px]">
          <li className="flex items-center gap-2 text-secondary2 text-[12px] font-medium">
            <img src={activeBirthdayIcon} alt="active user birthday icon" /> <span>12th Mar 2025: <strong>Mrs. Jenny</strong></span>
          </li>
          <li className="flex items-center gap-2 text-[12px] font-medium"><img src={upcomingBirthdayIcon} alt="active user birthday icon" /> <span>16th Mar 2025: Mr. John</span></li>
          <li className="flex items-center gap-2 text-[12px] font-medium"><img src={upcomingBirthdayIcon} alt="active user birthday icon" /> <span>18th Mar 2025: Mr. Smith</span></li>
        </ul>
      </div>
    </>
  )
}

export default EmpBirth;