"use client";
 
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Col, Input, Label, Row } from "reactstrap";
import { OtpKit } from "react-otp-kit";
import Breadcrumb from "../../Containers/Breadcrumb";
import { API } from "@/app/services/api.service";
 
 
const Login: NextPage = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [userName] = useState("User");
 
  const handleSendOtp = async () => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
 
    try {
      await API.sendOtp(phoneNumber);
      toast.success("OTP sent successfully");
      setOtpSent(true);
      setOtp("");
    } catch {
      toast.error("Failed to send OTP");
    }
  };
 
  const handleResendOtp = async () => {
    try {
      await API.resendOtp(phoneNumber);
      toast.info("OTP resent successfully");
      setOtp("");
    } catch {
      toast.error("Failed to resend OTP");
    }
  };
 
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }
 
    try {
      await API.verifyOtp(userName, phoneNumber, otp);
      localStorage.setItem("Login", phoneNumber);
      toast.success("Login successful");
      router.push(`/pages/account/checkout`);
    } catch {
      toast.error("OTP verification failed");
    }
  };
 
  return (
    <>
      <Breadcrumb title="Login" parent="Home" />
      <section className="login-page section-big-py-space bg-light">
        <div className="custom-container">
          <Row>
            <Col xl="4" lg="6" md="8" className="offset-xl-4 offset-lg-3 offset-md-2">
              <div className="theme-card p-4 shadow-sm">
                <h3 className="text-center mb-3">Sign In with OTP</h3>
               
                  <div className="form-group mb-3">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="form-control"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
 
                  {otpSent && (
                    <>
                      <Label className="form-label">Enter OTP</Label>
                      <div
                        className="mb-3 d-flex justify-content-center align-items-center"
                        style={{
                          gap: '10px',
                          flexWrap: 'nowrap',
                          width: '100%'
                        }}
                      >
                        <div className="otp-wrapper">
                          <OtpKit
                            value={otp}
                            onChange={setOtp}
                            type="number"
                            autoSubmit={false}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          className="btn btn-primary w-50 me-2"
                          disabled={otp.length !== 6}
                        >
                          Verify OTP
                        </button>
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          className="btn btn-outline-secondary w-50"
                        >
                          Resend OTP
                        </button>
                      </div>
                    </>
                  )}
 
                  {!otpSent && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="btn btn-primary w-100 mt-3"
                      disabled={!/^\d{10}$/.test(phoneNumber)}
                    >
                      Send OTP
                    </button>
                  )}
               
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};
 
export default Login;