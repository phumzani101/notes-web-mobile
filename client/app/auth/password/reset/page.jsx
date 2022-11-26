"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import { AuthContext } from "../../../../store/AuthContext";
import config from "../../../../config";

const ResetPagePage = () => {
  const [token, setToken] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  const canSave = [token, confirmPassword, password].every(Boolean);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and confirmation password don't match");
      setLoading(false);
      return;
    }
    try {
      if (canSave) {
        const { data } = await axios.post(
          `${config.siteApiUrl}/auth/password/reset`,
          {
            token: token,
            confirmPassword: confirmPassword,
            password: password,
          }
        );
        if (data.error) {
          toast.error(data.error);
          setLoading(false);
          return;
        } else {
          toast.success(
            "Your account password successfully resetted please login."
          );
          setToken("");
          setConfirmPassword("");
          setPassword("");
          router.push("/auth/signin");
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
                    <h3 className="fw-bold mb-2">Reset Password</h3>
                    <p>Follow the easy steps</p>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="signup-token"
                      placeholder="OTP Token"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    />
                    <label htmlFor="signup-token">OTP Token</label>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="signup-password"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="signup-password">New Password</label>
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="signup-confirmPassword"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label htmlFor="signup-confirmPassword">
                      Confirm New Password
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-block btn-lg btn-primary w-100"
                    type="submit"
                    disabled={!canSave}
                  >
                    {loading ? <PulseLoader color="#fff" /> : "Sign Up"}
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

export default ResetPagePage;
