import React, { Suspense } from 'react';
import { useNavigate } from "react-router-dom";
import Loader from '../../components/loader/loader';
import './login.css'
const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        // Add your login logic here

        // Redirect to the dashboard
        navigate("/dashboard");
    };
  return (
    <Suspense fallback={<div className='mainloader'><Loader /></div>}>
    <div className="container-scroller">
    <div className="container-fluid page-body-wrapper full-page-wrapper px-0">
        <div className="row w-100 m-0">
        <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
            <div className="card col-lg-4 mx-auto">
            <div className="card-body px-5 py-5">
                <h3 className="card-title text-left mb-3">Login</h3>
                <form>
                <div className="form-group">
                    <label>Username or email *</label>
                    <input type="text" className="form-control p_input" />
                </div>
                <div className="form-group">
                    <label>Password *</label>
                    <input type="text" className="form-control p_input" />
                </div>
                <div className="form-group d-flex align-items-center justify-content-between">
                    <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" />{" "}
                        Remember me{" "}
                    </label>
                    </div>
                    <a href="#" className="forgot-pass">
                    Forgot password
                    </a>
                </div>
                <div className="text-center">
                    <button
                    type="submit"
                    className="btn btn-primary btn-block enter-btn"
                    onClick={handleLogin}
                    >
                    Login
                    </button>
                </div>
                <p className="sign-up">
                    Don't have an Account?<a href="#"> Sign Up</a>
                </p>
                </form>
            </div>
            </div>
        </div>
        {/* content-wrapper ends */}
        </div>
        {/* row ends */}
    </div>
    {/* page-body-wrapper ends */}
    </div>
    </Suspense>
);
};
export default Login;