import React, { useState } from 'react'
import { logoutAction } from '../../reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import userPic from "../../images/duser.png";
import bellIcon from "../../images/icon/bell_icon.svg"
import arrowDown from "../../images/icon/arrow_down.svg"

const ManageProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const { user } = useSelector(state => state.auth)

    const toggleOptions = () => {
        setIsOptionsOpen(prev => !prev);
    }

    return (
        <div className="">
            <div className='flex gap-3'>
                <div className='bg-primary2 flex justify-center px-3 cursor-pointer rounded-lg'>
                    <img src={bellIcon} alt="bellIcon" />
                </div>
                <div className='w-[200px]'>
                    <div
                        onClick={toggleOptions}
                        className="bg-primary2 cursor-pointer rounded-lg py-[5px] flex items-center justify-center pl-[5px] pr-[14px] gap-5 w-full"
                    >
                        <img src={userPic} alt="userPic" className="h-[32px] w-[32px]" />
                        <span className='text-textsecondary text-sm'>Roman Clinic</span>
                        <img src={arrowDown} alt="arrowDown" />
                    </div>
                </div>
            </div>
            {
                isOptionsOpen &&
                <div
                    className="absolute mt-2 mx-28 w-[140px] rounded-lg bg-primary text-textcolor border border-gray-200 shadow-lg p-1"
                >
                    {/* <button
                        className="font-medium w-full text-left  py-2 text-sm hover:bg-secondary   hover:text-white  cursor-pointer  rounded-lg"
                        onClick={() => navigate("/profile")}
                    >
                        <span className='ml-4'>

                            Profile
                        </span>
                    </button> */}
                    <button
                        className="font-medium w-full  py-2 text-sm hover:bg-secondary hover:text-white cursor-pointer  rounded-lg"
                        onClick={() => {
                            toast.success("Logout successfully!");
                            dispatch(logoutAction());
                        }}
                    >
                        Logout
                    </button>
                </div>
            }
        </div>
    )
}

export default ManageProfile;


// import React, { useState } from 'react'
// import { logoutAction } from '../../reducers/userSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import userPic from "../../images/duser.png";

// const ManageProfile = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [isOptionsOpen, setIsOptionsOpen] = useState(false);
//     const { user } = useSelector(state => state.auth)

//     const toggleOptions = () => {
//         if (isOptionsOpen) {
//             setIsOptionsOpen(false);
//         } else {
//             setIsOptionsOpen(true);
//         }
//     }

//     return (
//         <div className=''>
//             <div onClick={() => toggleOptions()} className="bg-[#F0F0F0] relative cursor-pointer rounded-lg py-[5px] flex items-center justify-center pl-[5px] pr-[14px] gap-[14px]">
//                 <img src={userPic} alt="user profile picture" className="h-[32px] w-[32px]" />
//                 <span>Roman Clinic</span>
//             </div>
//             {
//                 isOptionsOpen &&
//                 <div className='transition-all absolute top-16 flex flex-col rounded-lg gap-4 bg-primary  text-textcolor px-4 py-2 mx-2 mr-18 '>
//                     <div className='flex justify-center items-center'
//                         onClick={() => navigate("/profile")}
//                     >
//                         {/*<img src={personIcon} alt="img" />*/}
//                         <button className=" font-medium  w-full text-xs text-center"> Profile </button>
//                         {/*<img src={arrowIcon} alt="img" />*/}
//                     </div>
//                     <div >
//                         <div className='flex justify-center items-center cursor-pointer'
//                             onClick={() => {
//                                 toast.success("Logout successfully!");
//                                 dispatch(logoutAction());
//                             }}
//                         >
//                             {/*<img src={logoutIcon} alt="img" />*/}
//                             <button className=" font-medium  w-full text-xs text-center">
//                                 Logout
//                             </button>
//                             {/*<img src={arrowIcon} alt="img" />*/}
//                         </div>
//                     </div>
//                 </div>
//             }

//         </div>

//     )
// }

// export default ManageProfile


// {/* <div className="flex mt-2 mx-2 mb-2 justify-between text-textcolor" onClick={() => toggleOptions()}>
// <div className='flex gap-2 bg-primary rounded-lg p-1 mr-1'>
//     {/*<img src={hocUserOne} alt="img" />*/}
// // <div className='flex justify-center items-center pr-1'>
// //     <button className="truncate font-medium   w-full  text-xs text-center">{user?.firstName ?  user?.firstName :"" + " "} {user?.lastName ? user?.lastName :""}</button>
// //     &nbsp;
// {/*<img src={arrowIcon} className='mr-3 transition-all' alt="img" style={{ rotate: isOptionsOpen && "-90deg" }} />*/ }
// //         &nbsp;
// //     </div>
// // </div>
// // <div>
// //     <div className='flex justify-center gap-1 mt-2'>
// //         <div className='flex bg-primary rounded-lg p-1 px-2'>
// {/* <img src={question} className='' alt="img" /> */ }
// // </div>
// // <div className='flex bg-primary rounded-lg p-1'>
// {/* <img src={bell} alt="img" /> */ }
// {/* </div>
//     </div>
// </div> */}
// {/* </div> */ } 