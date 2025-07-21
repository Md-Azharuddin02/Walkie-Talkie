import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Box,
  Typography,
  Container,
  Link,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import io from "socket.io-client";

const socket = io("https://walkie-talkie-backend-25gu.onrender.com");

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f8fafc",
    padding: 3,
    position: "relative",
  },
  gradientBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at top left, #ffffff 0%, #f0f4f8 100%)",
    zIndex: 0,
  },
  card: {
    padding: 4,
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    borderRadius: "16px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    position: "relative",
    overflow: "hidden",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      },
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.1)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(25, 118, 210, 0.5)",
      },
    },
  },
  otpContainer: {
    display: "flex",
    gap: 1,
    justifyContent: "center",
    marginTop: 2,
  },
  otpInput: {
    width: "40px",
    height: "40px",
    textAlign: "center",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    fontSize: "1.2rem",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    "&:focus": {
      outline: "none",
      borderColor: "#1976d2",
      boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
    },
  },
  linkContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 1,
  },
  link: {
    cursor: "pointer",
    color: "#1976d2",
    textDecoration: "none",
    "&.disabled": {
      color: "rgba(0, 0, 0, 0.38)",
      pointerEvents: "none",
    },
    "&:hover": {
      textDecoration: "underline",
    },
  },
};

function Register() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected, my socket ID =", socket.id);
      setSocketId(socket.id);
    });

    // clean up if component unmounts
    return () => {
      socket.off("connect");
    };
  }, []);

  const validatePhone = () => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number validation
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
    setRemainingTime(30); // 30 seconds cooldown
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
      const response = await axios.post(
        "/api/auth/send-otp",
        {
          phoneNumber: phone,
        }
      );
      console.log("OTP sent response:", response.data);

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
    try {
      const response = await axios.post(
        "/api/auth/verify-otp",
        {
          phoneNumber: phone,
          otp: otpValue,
          socketId: socketId,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      setErrors({
        submit: error.response?.data?.error || "Invalid OTP. Please try again.",
      });
      // Clear OTP fields on error
      setOtp(["", "", "", "", "", ""]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const newValue = value.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);

    // Auto-focus next input
    if (newValue && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleChangeNumber = () => {
    setIsOtpSent(false);
    setOtp(["", "", "", "", "", ""]);
    setErrors({});
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.gradientBg} />
      <Container
        component="main"
        maxWidth="xs"
        sx={{ position: "relative", zIndex: 1 }}
      >
        <Box sx={styles.card}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ mb: 3, textAlign: "center", color: "#1976d2" }}
          >
            Phone Verification
          </Typography>

          <TextField
            fullWidth
            label="Phone Number"
            value={phone}
            onChange={handlePhoneChange}
            error={!!errors.phone}
            helperText={errors.phone}
            disabled={isOtpSent || isLoading}
            sx={styles.textField}
            inputProps={{ maxLength: 10 }}
          />

          <Box sx={styles.linkContainer}>
            <Link
              component="button"
              variant="body2"
              onClick={handleChangeNumber}
              className={!phone || isLoading ? "disabled" : ""}
              sx={styles.link}
            >
              Change Number
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={handleSendOTP}
              className={
                !phone || isLoading || remainingTime > 0 ? "disabled" : ""
              }
              sx={styles.link}
            >
              {remainingTime > 0
                ? `Resend OTP in ${remainingTime}s`
                : "Send OTP"}
            </Link>
          </Box>

          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <CircularProgress size={24} />
            </Box>
          )}

          <Box sx={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                disabled={!isOtpSent || isLoading}
                style={styles.otpInput}
                maxLength={1}
                autoComplete="off"
              />
            ))}
          </Box>

          {errors.otp && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mt: 1, textAlign: "center" }}
            >
              {errors.otp}
            </Typography>
          )}

          {errors.submit && (
            <Typography
              color="error"
              variant="body2"
              sx={{ mt: 1, textAlign: "center" }}
            >
              {errors.submit}
            </Typography>
          )}

          {isOtpSent && (
            <Link
              component="button"
              variant="body2"
              onClick={handleVerifyOTP}
              sx={{
                ...styles.link,
                display: "block",
                textAlign: "center",
                mt: 2,
              }}
            >
              Verify OTP
            </Link>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Register;
