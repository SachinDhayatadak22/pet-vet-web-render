import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { apiPOST } from '../../utils/apiHelper';
import { toast } from 'react-toastify';
// import googleLogo from '../../images/logo/google-logo.svg'
// import linkedinLogo from '../../images/logo/linkedin-logo.svg'
import AuthBaseLayout from '../../layout/AuthBaseLayout';
import adminIcon from '../../images/authentication/adminIcon.svg';
import BackToLogin from '../../common/BackToLogin.jsx';

const PageSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setConfirmShowPassword] = useState(true);
  const nameRegex = /^[a-zA-Z\s]+$/;
  const nameRegexWithEmtyString = /^[a-zA-Z\s]*$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const initialState = {
    clinicname: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const [userDetails, setUserDetails] = useState(initialState);

  const [errorState, setErrorState] = useState({
    clinicname: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'clinicname') {
      if (!nameRegexWithEmtyString.test(value)) {
        return;
      }
    }
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const checkValidation = (userDetails) => {
    const { email, password, clinicname, confirmPassword } =
      userDetails;

    if (!email || !password) {
      setErrorMessage('Please provide your credentials!');
      setErrorState({ email: !email, password: !password });
      setLoading(false);
      return false;
    }
    if (!nameRegex.test(clinicname)) {
      setErrorMessage('Enter first name');
      setErrorState({
        clinicname: true,
        email: false,
        password: false,
      });
      setLoading(false);
      return false;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format!');
      setErrorState({ email: true, password: false });
      setLoading(false);
      return false;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must include uppercase, lowercase, a symbol, and a number.',
      );
      setErrorState({
        email: false,
        password: true,
        clinicname: false,
        confirmPassword: false,
      });
      setLoading(false);
      return false;
    }
    if (!passwordRegex.test(confirmPassword)) {
      setErrorMessage(
        'Confirm Password must include uppercase, lowercase, a symbol, and a number.',
      );
      setErrorState({
        email: false,
        confirmPassword: true,
        clinicname: false,
        password: false,
      });
      setLoading(false);
      return false;
    }

    if (!(password === confirmPassword)) {
      setErrorMessage('Passwords do not match!');
      setErrorState({
        email: false,
        confirmPassword: true,
        clinicname: false,
        password: true,
      });
      return false;
    }
    // If all validations pass
    setErrorState({
      email: false,
      password: false,
      confirmPassword: false,
      clinicname: false,
    });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validated = checkValidation(userDetails);

      if (validated) {
        const response = await apiPOST(`/admin/register-admin`, {
          clinicname: userDetails.clinicname,
          email: userDetails.email,
          password: userDetails.password,
          role: "admin"
        });
        const result = response?.data;
        
        if (result?.status) {
          const token = result?.data?.otpResult?.data?.token;
          const email = userDetails.email
          navigate(`/verify-email-registration/${token}`, {
            state: { email },
          });
          toast.success('Signup Successful');
        } else {
          toast.error(result?.message || 'Failed to Signup');
          setErrorMessage(result?.message);
          setErrorState(true);
        }
      }
    } catch (error) {
      console.error('error', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setUserDetails(initialState);
      setLoading(false);
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
        <div className="text-start sm:text-center mb-[37px]">
          <h1 className="text-[32px] font-semibold mb-2 font-poppins text-textcolor tracking-[0.64px]">
            Create an account
          </h1>
          <p className="text-[16px] font-medium tracking-[0.32px] text-textgray">Create your account in FitPez, it takes less than a
            minute.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="clinicname"
            placeholder="Clinic Name"
            value={userDetails.clinicname}
            onChange={(e) => handleChange(e)}
            className={`w-full px-[16px] py-[10px] text-[14px] font-medium rounded-lg bg-primary text-textcolor outline-none focus:ring-2 focus:ring-secondary ${errorState.clinicname ? 'border border-red-700' : ''
              }`}
          />
          <div className="mt-[20px]">
            <label className="sr-only">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userDetails.email}
              onChange={(e) => handleChange(e)}
              className={`w-full px-[16px] py-[10px] text-[14px] font-medium rounded-lg bg-primary text-textcolor outline-none focus:ring-2 focus:ring-secondary ${errorState.email ? 'border border-red-700' : ''
                }`}
            />
          </div>
          <div className="relative mt-[20px] ">
            <input
              type={showPassword ? 'password' : 'text'}
              name="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={(e) => handleChange(e)}
              className={`w-full px-[16px] py-[10px]  text-[14px] font-medium rounded-lg bg-primary text-textcolor outline-none focus:ring-2 focus:ring-secondary ${errorState.password ? 'border border-red-700' : ''
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-400"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
          <div className="relative mt-[20px] ">
            <input
              type={showConfirmPassword ? 'password' : 'text'}
              name="confirmPassword"
              placeholder="Re-Type Password"
              value={userDetails.confirmPassword}
              onChange={(e) => handleChange(e)}
              className={`w-full px-[16px] py-[10px] text-[14px] font-medium rounded-lg bg-primary text-textcolor outline-none focus:ring-2 focus:ring-secondary ${errorState.confirmPassword ? 'border border-red-700' : ''
                }`}
            />
            <button
              type="button"
              onClick={() => setConfirmShowPassword((prev) => !prev)}
              className="absolute right-3 top-3 text-gray-400"
              aria-label="Toggle password visibility"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
          <div className="mt-[20px]">
            <span className="text-textgray block px-[20px] text-center text-[12px] tracking-[0.24px] font-medium">
              By creating an account, you agree to our{' '}
              <span className="text-secondary cursor-pointer font-normal">
                Privacy Policy{' '}
              </span>{' '}
              and{' '}
              <span className="text-secondary cursor-pointer font-normal">
                {' '}
                Terms of Service{' '}
              </span>
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-[10px]  mt-[31px] rounded-[20px] bg-secondary text-white font-medium"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
          {errorMessage && (
            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
          )}

        </form>
        <BackToLogin />
      </div>
    </AuthBaseLayout>
  );
};

export default PageSignUp;
