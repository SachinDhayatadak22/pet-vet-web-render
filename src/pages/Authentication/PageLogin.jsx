// PageLogin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { loginUser } from '../../reducers/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import googleLogo from '../../images/logo/google-logo.svg';
// import linkedinLogo from '../../images/logo/linkedin-logo.svg';
import AuthBaseLayout from '../../layout/AuthBaseLayout';
import adminIcon from '../../images/authentication/adminIcon.svg'

const PageLogin = ({ mode }) => {
    const [role, setRole] = useState(mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
        role: mode || "admin"
    });
    const [errorState, setErrorState] = useState({
        email: false,
        password: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const checkValidation = (userDetails) => {
        const { email, password } = userDetails;
        if (!email || !password) {
            setErrorMessage('Please provide your sign in credentials!');
            setErrorState({ email: !email, password: !password });
            setLoading(false);
            return false;
        }
        setErrorState({ email: false, password: false });
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validated = checkValidation(userDetails);
        if (validated) {
            try {
                await dispatch(loginUser(userDetails)).unwrap();
                navigate('/dashboard');
                toast.success('Sign In Successful');
            } catch (errorMessage) {
                console.error(errorMessage);
                toast.error(errorMessage || 'Failed to Sign In');
            }
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accesstoken');
        if (accessToken) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <AuthBaseLayout>
            <div className="relative flex flex-col items-center justify-center w-[414px] mx-auto h-screen">
                <div className="text-start sm:text-center">
                    <h1 className="text-[32px] font-semibold font-poppins text-textcolor tracking-[0.64px]">
                        Welcome to Fitpez
                    </h1>
                    <p className="text-[16px] font-medium mb-[29px] text-textgray tracking-[0.32px]">We are happy to see you again, Enter
                        your Email and Password</p>
                    {mode !== "admin" ? (
                        <>
                            <div className="relative flex items-center justify-center w-full pb-[45px] pt-[35px]">
                                <button
                                    className={`absolute left-[15px] w-1/2 py-[10px] text-center text-[14px] font-medium rounded-full transition-all duration-300 ${role === "vet"
                                        ? "bg-secondary text-white z-10"
                                        : "text-textTertiary z-0 bg-primary"
                                        }`}
                                    onClick={() => setRole("vet")}
                                >
                                    Veterinarian
                                </button>
                                <button
                                    className={`absolute right-[15px] w-1/2 py-[10px] text-center text-[14px] font-medium rounded-full transition-all duration-300 ${role === "nurse"
                                        ? "bg-secondary text-white z-10"
                                        : "text-textTertiary z-0 bg-primary"
                                        }`}
                                    onClick={() => setRole("nurse")}
                                >
                                    Nurse
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center w-full mb-[45px]">
                            <img src={adminIcon} alt="icon" className="mr-3" />
                            <span className="uppercase text-[18px] font-semibold text-textcolor">Administrator</span>
                        </div>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="w-full">
                    <div>
                        <label className="sr-only">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userDetails.email}
                            onChange={handleChange}
                            className={`w-full px-[16px] py-[10px] text-[14px] font-medium mb-[18px] rounded-lg bg-primary text-textcolor outline-none focus:ring-2 focus:ring-secondary ${errorState.email ? 'border border-red-700' : ''
                                }`}
                        />
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'password' : 'text'}
                            name="password"
                            placeholder="Password"
                            value={userDetails.password}
                            onChange={handleChange}
                            className="w-full px-[16px] py-[10px] text-[14px] font-medium mb-[18px] rounded-lg bg-primary text-textcolor outline-none focus:ring-2 focus:ring-secondary"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-3 text-gray-400"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                        </button>
                    </div>
                    <div className="flex items-center justify-between text-gray-400 mb-[32px]">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => setIsChecked(!isChecked)}
                                className="text-secondary ring-secondary"
                            />
                            <span className="text-xs text-textgray font-medium">Remember for 30 days</span>
                        </label>
                        <span onClick={() => navigate('/forget-password')} className="text-secondary font-medium text-xs cursor-pointer">
                            Forget Password?
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-[10px] rounded-3xl bg-secondary text-white text-[16px] font-semibold "
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
                </form>
                <div className="mt-[31px]">
                    {
                        userDetails?.role === "admin" &&
                        <span className="text-[14px] font-medium text-textgray">
                            Don't have an account ? <a href="#" className="text-secondary" onClick={(e) => { e.preventDefault(); navigate("/signup") }}>Create an account</a>
                        </span>
                    }
                </div>
            </div>
        </AuthBaseLayout>
    );
};

export default PageLogin;
