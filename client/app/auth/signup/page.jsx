"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import config from "../../../config";
import { AuthContext } from "../../../store/AuthContext";
import { saveInLocalStorage } from "../../../store/lsutils";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  const canSave = [name, email, password].every(Boolean);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (canSave) {
        const { data } = await axios.post(`${config.siteApiUrl}/auth/signup`, {
          name: name,
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
          setName("");
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
                    <h3 className="fw-bold mb-2">Sign Up</h3>
                    <p>Follow the easy steps</p>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="signup-name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="signup-name">Name</label>
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

export default SignupPage;
