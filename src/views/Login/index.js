import React, {Suspense, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Loader from '../../components/loader/loader';
import './login.css'
import {postRequest} from "../../service/apiService";
import {LOGIN} from "../../config/apiConfig";
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "",role:"101", rememberMe: false,});
    const handleLogin = async (event) => {
        event.preventDefault();
        // Add your login logic here
        const response = await postRequest(LOGIN, formData);
        const loginResp=response.response;
        debugger;
        if(loginResp.jwtToken){
            if(formData.rememberMe){
                localStorage.setItem('token',loginResp.jwtToken);
                localStorage.setItem('role',loginResp.role);
                localStorage.setItem('username',loginResp.username);
            }else{
                sessionStorage.setItem('token',loginResp.jwtToken);
                sessionStorage.setItem('role',loginResp.role);
                sessionStorage.setItem('username',loginResp.username);
            }

            // Redirect to the dashboard
            navigate("/dashboard");
        }

    };
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
        }));
        debugger;
    };


  return (
    <Suspense fallback={<div className='mainloader'><Loader /></div>}>
    <div className="container-scroller">
    <div className="container-fluid page-body-wrapper full-page-wrapper px-0">
        <div className="row w-100 m-0">
        <div className="content-wrapper full-page-wrapper d-flex align-items-center auth login-bg">
            <div className="card col-lg-4 mx-auto">
            <div className="card-body px-5 py-5">
                <h3 className="text-center mb-3">Login</h3>
                <form>
                    <div className="form-group">
                        <label>Username or email *</label>
                        <input type="text" className="form-control p_input" name="username" onChange={handleInputChange}
                               required value={formData.username}/>
                    </div>
                    <div className="form-group">
                        <label>Password *</label>
                        <input type="password" className="form-control p_input" name="password"
                               value={formData.password} onChange={handleInputChange} required/>
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-between">
                        <div className="form-check">
                            <input type="checkbox" name ="rememberMe"  className="form-check-input" value={formData.rememberMe} onChange={handleInputChange}/>
                            <label className="form-check-label">
                                Remember me
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
