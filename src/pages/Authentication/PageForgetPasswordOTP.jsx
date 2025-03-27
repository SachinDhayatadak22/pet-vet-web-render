import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { apiPOST } from '../../utils/apiHelper';
import AuthBaseLayout from '../../layout/AuthBaseLayout';
// import arrowPreviousPage from '../../images/icon/arrow-previous-page.svg'
import { toast } from 'react-toastify';
import BackToLogin from '../../common/BackToLogin.jsx';
import lockIcon from '../../images/icon/lock.svg';

const PageForgetPasswordOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timer, setTimer] = useState(60 * 5);
  const { token } = useParams();
  const { email } = location.state || {};

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        const previousSibling = e.target.previousSibling;
        if (previousSibling) previousSibling.focus();
      }
    } else if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('Text').slice(0, 6).replace(/[^0-9]/g, '');
    if (pasteData.length === 6) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
    }
  };

  const handleResendOtp = async () => {
    setTimer(60 * 5);
    const userDetails = {
      email
    }
    try {
      const response = await apiPOST(`/v1/auth/forgot-password`, userDetails);
      const result = response?.data;
      if (result?.code === 200) {
        toast.success("Code sent to your email");
      } else {
        toast.error("Failed to resend code")
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      console.error("error");
    }
  };

  const checkValidation = () => {
    if (otp.includes('') || otp.length < 6) {
      setErrorMessage('Please enter the complete 6-digit Code.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkValidation()) return;

    setLoading(true);
    try {
      const response = await apiPOST("/admin/forget-password-otp", { token, otp: otp.join('') });
      
      if (response?.status === 200) {
        navigate(`/reset-password/${token}`);
        toast.success("Code Verified Successfully")
      } else {
        setErrorMessage(response?.message || 'Code verification failed.');
        toast.error("Failed to verify Code")
      }
    } catch (error) {
      console.error('Code verification error', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBaseLayout>
      <div className="relative flex flex-col items-center justify-center w-[414px] mx-auto h-screen">
        <div className="text-center mb-[37px]">
          <div className="flex justify-center mb-8">
            <img src={lockIcon} alt="" />
          </div>

          <h1 className="text-[32px] font-semibold mb-2 font-poppins text-textcolor tracking-[0.64px]">
            Password reset
          </h1>
          <p className="text-[16px] font-medium text-textgray tracking-[0.32px]">We sent a code  to <span className='text-textcolor font-semibold'>{email}</span></p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-center gap-2">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleOtpChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : null}
              className="w-12 h-12 px-[18px] py-[10px] rounded-lg bg-primary text-textcolor outline-none focus:ring-2 focus:ring-secondary"
            />
          ))}
        </div>
        <p className="text-center mt-2">
          {timer > 0 ? (
            <span className="text-textcolor">
              {timer < 60
                ? `Resend in 00:${timer < 10 ? `0${timer}` : timer}`
                : `Resend in ${Math.floor(timer / 60)
                  .toString()
                  .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`}
            </span>
          ) : (
            <button type="button" onClick={handleResendOtp} className="text-secondary font-medium">
              Resend Code
            </button>
          )}
        </p>
        <button
          type="submit"
          className="w-full py-[10px] rounded-[20px] bg-secondary text-white font-medium"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Continue'}
        </button>
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      </form>
      <BackToLogin/>
    </div>
    </AuthBaseLayout>
  );
};

export default PageForgetPasswordOTP;
