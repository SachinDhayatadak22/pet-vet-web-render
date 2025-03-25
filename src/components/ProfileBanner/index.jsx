const ProfileBanner = ({name}) => {
  return (
    <div className="relative w-[calc(100%+60px)] -mx-[30px] -mt-[30px] mb-[80px]">
      {/* Banner */}
      <div className="h-32 bg-bgPrimary"></div>

      {/* Profile Section */}
      <div className="relative px-6 pb-6 flex">
        <div className="absolute -top-[84px] left-[58px]">
          <div className="w-[187px] h-[187px] bg-bg1 rounded-full"></div>
        </div>
        <div className="mt-5 ml-[251px]">
          <h2 className="text-xl font-bold text-gray-900">{name}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
