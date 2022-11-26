"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PulseLoader } from "react-spinners";
import config from "../../../../config";
import { AuthContext } from "../../../../store/AuthContext";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  const canSave = [email].every(Boolean);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (canSave) {
        const { data } = await axios.post(
          `${config.siteApiUrl}/auth/password/forgot`,
          {
            email: email,
          }
        );
        if (data.error) {
          toast.error(data.error);
          setLoading(false);
          return;
        } else {
          toast.success("Please check your email for the reset token.");
          setEmail("");
          router.push("/auth/password/reset");
        }
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth) {
      router.push("/");
    }
  }, []);
  return (
    <div className="container">
      <div className="row align-items-center justify-content-center min-vh-100 gx-0">
        <div className="col-12 col-md-5 col-lg-4">
          <div className="card card-shadow border-0">
            <div className="card-body">
              <form className="row g-6" onSubmit={handleSubmit}>
                <div className="col-12">
                  <div className="text-center">
                    <h3 className="fw-bold mb-2">Password Reset</h3>
                    <p>Enter your email to reset password</p>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="signup-email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="signup-email">Email</label>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-block btn-lg btn-primary w-100"
                    type="submit"
                  >
                    {loading ? <PulseLoader color="#fff" /> : "Send Reset Link"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Text */}
          <div className="text-center mt-8">
            <p>
              Already have an account? <Link href="/auth/signin">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
