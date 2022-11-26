"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import config from "../../../config";
import { AuthContext } from "../../../store/AuthContext";
import { saveInLocalStorage } from "../../../store/lsutils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PulseLoader } from "react-spinners";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  const canSave = [email, password].every(Boolean);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (canSave) {
        const { data } = await axios.post(`${config.siteApiUrl}/auth/signin`, {
          email: email,
          password: password,
        });
        if (data.error) {
          toast.error(data.error);
          setLoading(false);
          return;
        } else {
          setAuth(data);

          // save in local storage
          saveInLocalStorage("auth", data);
          toast.success("Your account has been created.");
          setEmail("");
          setPassword("");
          router.push("/");
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
                    <h3 className="fw-bold mb-2">Sign In</h3>
                    <p>Login to your account</p>
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
                <div className="col-12 mb-3">
                  <div className="form-floating">
                    <input
                      type="password"
                      className="form-control"
                      id="signup-password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="signup-password">Password</label>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-block btn-lg btn-primary w-100"
                    type="submit"
                    disabled={!canSave}
                  >
                    {loading ? <PulseLoader color="#fff" /> : "Sign In"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Text */}
          <div className="text-center mt-8">
            <p>
              Don't have an account yet?{" "}
              <Link href="/auth/signup">Sign up</Link>
            </p>
            <p>
              <Link href="/auth/password/forgot">Forgot Password?</Link>
            </p>
          </div>
        </div>
      </div>{" "}
      {/* / .row */}
    </div>
  );
};

export default SigninPage;
