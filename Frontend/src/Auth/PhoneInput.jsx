import React, { useState } from "react";

export default function Register() {


    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

  const validatePhone = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone || !phoneRegex.test(phone)) {
      setErrors({ phone: "Please enter a valid Indian mobile number" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
    if (errors.phone) setErrors({});
  };

  const startResendTimer = () => {
    setRemainingTime(30);
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async () => {
    if (!validatePhone() || isLoading || remainingTime > 0) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${ import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`, {
        phoneNumber: phone,
      });

      if (response.data.success) {
        setIsOtpSent(true);
        setErrors({});
        startResendTimer();
      }
    } catch (error) {
      setErrors({
        submit:
          error.response?.data?.error ||
          "Failed to send OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6 || isLoading) {
      setErrors({ otp: "Please enter complete OTP" });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (otpValue === "123456") {
        alert("✅ Verification Successful!");
        setIsLoading(false);
      } else {
        setErrors({ submit: "Invalid OTP. Try 123456 for demo" });
        setOtp(["", "", "", "", "", ""]);
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleOtpChange = (i, v) => {
    const newVal = v.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[i] = newVal;
    setOtp(newOtp);

    if (newVal && i < 5) {
      document.getElementById(`otp-${i + 1}`).focus();
    }
  };

  const handleChangeNumber = () => {
    setIsOtpSent(false);
    setOtp(["", "", "", "", "", ""]);
    setErrors({});
    setRemainingTime(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" style={{animation: "pulse 3s ease-in-out infinite 1s"}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" style={{animation: "pulse 3s ease-in-out infinite 0.5s"}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Card Container with Enhanced Glassmorphism */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 md:p-10 lg:p-12 transform transition-all duration-500 hover:shadow-3xl">
          {/* Header */}
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 md:mb-6 shadow-lg transform transition-transform hover:scale-110">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Phone Verification
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              {isOtpSent ? "Enter the 6-digit code sent to your phone" : "Enter your phone number to get started"}
            </p>
          </div>

          {/* Phone Input Section */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 text-base sm:text-lg font-medium">+91</span>
              </div>
              <input
                type="text"
                maxLength={10}
                value={phone}
                disabled={isOtpSent || isLoading}
                onChange={handlePhoneChange}
                placeholder="Phone Number"
                className={`w-full pl-16 pr-4 py-3 sm:py-4 text-base sm:text-lg rounded-xl bg-white/80 border-2 transition-all duration-300
                ${errors.phone ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-blue-500"}
                ${isOtpSent || isLoading ? "opacity-60 cursor-not-allowed" : ""}
                focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-sm hover:shadow-md`}
              />
              {errors.phone && (
                <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-red-500 text-xs sm:text-sm" style={{animation: "shake 0.3s ease-in-out"}}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-2 pt-2">
              <button
                className={`text-sm sm:text-base font-medium transition-all duration-300
                ${!phone || isLoading ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:text-blue-700 hover:underline"}`}
                onClick={handleChangeNumber}
                disabled={!phone || isLoading}
              >
                Change Number
              </button>

              <button
                className={`px-6 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 transform
                ${!phone || isLoading || remainingTime > 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg hover:scale-105"}`}
                onClick={handleSendOTP}
                disabled={!phone || isLoading || remainingTime > 0}
              >
                {remainingTime > 0 ? `Resend in ${remainingTime}s` : isOtpSent ? "Resend OTP" : "Send OTP"}
              </button>
            </div>
          </div>

          {/* Loading Spinner */}
          {isLoading && (
            <div className="flex justify-center my-6">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{animationDelay: "150ms"}}></div>
              </div>
            </div>
          )}

          {/* OTP Input Section */}
          <div className={`transition-all duration-500 ${isOtpSent ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 h-0 overflow-hidden"}`}>
            <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center mb-6">
              {otp.map((d, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  disabled={!isOtpSent || isLoading}
                  value={d}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className={`w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 text-center text-xl sm:text-2xl font-bold
                  border-2 rounded-xl bg-white/80 transition-all duration-300
                  ${d ? "border-blue-500 bg-blue-50" : "border-gray-300"}
                  focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:scale-110
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:border-blue-400 shadow-sm hover:shadow-md`}
                />
              ))}
            </div>

            {errors.otp && (
              <div className="flex items-center justify-center gap-1 text-red-500 text-sm mb-4" style={{animation: "shake 0.3s ease-in-out"}}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{errors.otp}</span>
              </div>
            )}

            {/* Verify Button */}
            <button
              onClick={handleVerifyOTP}
              disabled={isLoading || otp.join("").length !== 6}
              className={`w-full py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 transform
              ${isLoading || otp.join("").length !== 6
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:scale-105 active:scale-95"}`}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm" style={{animation: "shake 0.3s ease-in-out"}}>
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{errors.submit}</span>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-xs sm:text-sm text-gray-500">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}