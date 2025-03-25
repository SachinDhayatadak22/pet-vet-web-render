
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPOST } from '../../utils/apiHelper';
import { toast } from 'react-toastify';
// import arrowPreviousPage from '../../images/icon/arrow-previous-page.svg'
import AuthBaseLayout from '../../layout/AuthBaseLayout';
import BackToLogin from '../../common/BackToLogin.jsx';
import envelopIcon from '../../images/icon/envelop.svg';

const PageForgetPasswordEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userDetails, setUserDetails] = useState({
    email: '',
  })
  const [errorState, setErrorState] = useState({
    email: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  const checkValidation = (userDetails) => {
    const { email } = userDetails;

    if (!email) {
      setErrorMessage('Please provide your email!');
      setErrorState({ email: !email, });
      setLoading(false);
      return false;
    }

    setErrorState({ email: false });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validated = checkValidation(userDetails);

      if (validated) {
        const response = await apiPOST(`/admin/forget-password-email`, userDetails);
        const result = response?.data;
        console.log(result);

        console.log("result ::->", result?.data?.token);

        if (result?.code === 200) {
          
          navigate(`/verify-code/${result?.data?.token} `, { state: { email: userDetails.email } });
          toast.success("Code sent to your email");
        } else {
          toast.error(result?.message || "Failed to send Code")
          setErrorMessage(result?.message);
          setErrorState(true);
        }
      }
    } catch (error) {
      console.error("error", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
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
        <div className="text-start sm:text-center mb-[65px]">
          <div className="flex justify-center mb-8">
            <img src={envelopIcon} alt="" />
          </div>
          <h1 className="text-[32px] font-semibold mb-2 font-poppins text-textcolor tracking-[0.64px]">
            Forgot Password
          </h1>
          <p className="text-[16px] font-medium text-textgray tracking-[0.32px]">No worries, We will send you reset instruction</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="">
            <label className="sr-only">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={userDetails.email}
              onChange={(e) => handleChange(e)}
              className={`w-full px-4 py-2 font-medium rounded-lg bg-primary text-textcolor outline-none ${errorState.email ? 'border border-red-700' : ''}`}
              />
          </div>
          <button
            type="submit"
            className="w-full py-[10px] rounded-[20px] mt-[20px] text-4 bg-secondary text-white font-semibold"
            disabled={loading}
          >
            {loading ? "Resetting password..." : "Reset password"}
          </button>
          {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
        </form>
        <BackToLogin text="Back to" />
      </div>

    </AuthBaseLayout>
  );
};

export default PageForgetPasswordEmail;