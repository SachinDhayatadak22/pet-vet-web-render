import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { apiPOST } from '../../utils/apiHelper';
import AuthBaseLayout from '../../layout/AuthBaseLayout';
// import arrowPreviousPage from '../../images/icon/arrow-previous-page.svg'
import { toast } from 'react-toastify';
import BackToLogin from '../../common/BackToLogin.jsx';
import dotIcon from '../../images/icon/dot.svg';

const PageResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errorState, setErrorState] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const validatePasswords = () => {
    const { newPassword, confirmPassword } = passwords;

    if (!newPassword || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      setErrorState({ newPassword: !newPassword, confirmPassword: !confirmPassword });
      setLoading(false);
      return false;
    }

    if (!passwordRegex.test(newPassword)) {
      setErrorMessage('Password must include uppercase, lowercase, a symbol, and a number.');
      setErrorState({ newPassword: true, confirmPassword: false });
      setLoading(false);
      return false;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      setErrorState({ newPassword: false, confirmPassword: true });
      setLoading(false);
      return false;
    }

    setErrorState({ newPassword: false, confirmPassword: false });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isValid = validatePasswords();
    if (isValid) {
      try {
        const response = await apiPOST("/admin/reset-password", { token, newPassword: passwords.newPassword });
        if (response?.status === 200) {
          navigate('/login/admin');
          toast.success("Password updated successfully")
        } else {
          toast.error(response?.message || "Reset password failed")
          setErrorMessage(response?.message || 'Reset password failed.');
        }
      } catch (error) {
        console.error("Reset password error", error);
        setErrorMessage("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AuthBaseLayout>
      <div className="relative flex flex-col items-center justify-center w-[414px] mx-auto h-screen">
        <div className="text-start sm:text-center mb-[37px]">
          <div className="flex justify-center mb-8">
            <img src={dotIcon} alt="" />
          </div>
          <h1 className="text-[32px] font-semibold mb-2 font-poppins text-textcolor tracking-[0.64px]">
            Set New Password
          </h1>
          <p className="text-[16px] font-medium text-textgray tracking-[0.32px]">Must be at least 8 Character</p>
        </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <input
            type={showPassword ? "password" : "text"}
            name="newPassword"
            placeholder="Password"
            value={passwords.newPassword}
            onChange={handleChange}
            className={`w-full px-[16px] py-[10px] ] text-[14px] font-medium rounded-lg bg-primary text-textcolor outline-none focus:ring-2 focus:ring-secondary ${errorState.newPassword ? 'border border-red-700' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400"
            aria-label="Toggle new password visibility"
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        </div>
        <div className="relative mt-[20px]">
          <input
            type={showConfirmPassword ? "password" : "text"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={passwords.confirmPassword}
            onChange={handleChange}
            className={`w-full px-[16px] py-[10px] ] text-[14px] font-medium rounded-lg bg-primary text-textcolor outline-none focus:ring-2 focus:ring-secondary ${errorState.confirmPassword ? 'border border-red-700' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-400"
            aria-label="Toggle confirm password visibility"
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-[10px] rounded-[20px] mt-[20px] text-4 bg-secondary text-white font-semibold"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
      </form>
        <BackToLogin/>
      </div>
    </AuthBaseLayout>
  );
};

export default PageResetPassword;
