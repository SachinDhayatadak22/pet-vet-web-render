import LocateAddress from '../LocateAddress/index.jsx';
import Separator from '../Seperator/index.jsx';

const VetAddress = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 mt-[28px] mb-[28px]">
        {/* Left Column (35%) */}
        <div className="col-span-4">
          <h2 className="text-[20px] font-medium">Location</h2>
          <p className="mb-0 mt-2 text-[16px] text-textColor2 font-normal">Connect Enterprises, STPI, T-7, MIDC, MIDC Industrial Area, Chilkalthana, Chhatrapati Sambhaji Nagar, Maharashtra 431006</p>
        </div>

        {/* Right Column (65%) */}
        <div className="col-span-8 flex items-center justify-center h-[196px]">
          <LocateAddress />
        </div>
      </div>
      <Separator/>
    </>
  );
};

export default VetAddress;
