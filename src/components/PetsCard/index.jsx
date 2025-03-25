import marginIcon from "../../images/icon/margin.svg";
import pawAppointment from "../../images/icon/pawappoint.svg";

const PetsCard = () => {
  return (
    <>
      <div className="bg-white p-4 rounded-[12px] shadow-md border">
        <h3 className="text-[14px] font-semibold leading-[15px] flex items-center gap-1 text-[#4C4D51] mb-[17px] font-poppins">
          <span><img src={pawAppointment} alt="pet appointment icon"/></span> Total Pets
        </h3>
        <div className="flex items-center justify-between ">
          <div>
            <p className="text-3xl font-bold mt-2 mb-2">965</p>
            <p className="text-gray-500 text-sm">56 More than Yesterday</p>
          </div>

          <span className="bg-secondary text-black text-xs px-[8px] py-[6px] rounded-[5px] flex gap-2 font-semibold">
             <img src={marginIcon} alt="margin icon" className="text-opacity-65"/> +2.14%
          </span>
        </div>
      </div>
    </>
  );
};

export default PetsCard;
