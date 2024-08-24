import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

import { MyDispatchContext } from '../../configs/Context';
import APIs, { authApi, endpoints } from '../../configs/APIs';
import { setToken } from '../../utils/storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FacebookLogin} from 'react-facebook-login'

const Login = () => {
  const [error, setError] = useState('');
  const [user, setUser] = useState({});
  const [alertShown, setAlertShown] = useState(false);
  const nav = useNavigate();
  const dispatch = useContext(MyDispatchContext);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const clientId = '611474340578-ilfvgku96p9c6iim54le53pnhimvi8bv.apps.googleusercontent.com';

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const handleGoogleLoginSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res);
  };

  const handleGoogleLoginFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };

  const fields = [
    { label: "Username", icon: "email", field: "username" },
    { label: "Password", icon: "lock", field: "password", secureTextEntry: true },
  ];

  const change = (value, field) => {
    setUser((current) => {
      return { ...current, [field]: value };
    });
  };

  const login = async () => {
    setIsLoggingIn(true);
    try {
      let res = await APIs.post(endpoints["login"], {
        ...user,
        // "client_id": "7rrgMPM5ZyDftLLyYE8O1iM4z9lr9QhqvbF7rNWO",
        // "client_secret": "nW8B2KcbUPxLFPCkL1iSqadDymHJrwJwN7oYZnuQzyC6TfPY3O1bMgoVtnxznyoWLwN3eDuJZPBTaPLlVICMl5qHalTKo9zeAeTXMYWBO5wTWdJuZGtE72YjFF5siGq8",
        
        "client_id": "8gMvsTseiW2YTOd9tik7q5VZxGNbhqdmY49qHkVU",
        "client_secret": "qLfzKj3gXRmzVk4s6guZrm1KPYelxZF3aqJKMSMXmc4Dv8QYGq4bhJhpkae0yN1Qf2C7jiT0IqXqLwBlxX4xYzcqjTdCYoBnuq760mUOGRxOuRw3Zi7hSW8IkSTIhWhf",
      
        "grant_type": "password",
      });

      setToken(res.data.access_token);
      setTimeout(async () => {
        let user = await authApi(res.data.access_token).get(endpoints["current_user"]);
        dispatch({ "type": "login", "payload": user.data });
        setTimeout(() => nav("/"), 500);
        if (!alertShown) {
          toast.success('Đăng nhập thành công');
          setAlertShown(true);
        }
      }, 100);
    } catch (ex) {
      if (!alertShown) {
        toast.error('Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại !!');
        setAlertShown(true);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };
  const responseFacebook = (response) => {
    console.log(response);
  }
  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/007/164/537/original/fingerprint-identity-sensor-data-protection-system-podium-hologram-blue-light-and-concept-free-vector.jpg')" }}>
      <form className="bg-white p-8 rounded-xl shadow-xl w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>
        <div className="mb-4">
          {fields.map((f) => (
            <div key={f.field} className="mb-5">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={f.field}>{f.label}</label>
              <input
                type={f.secureTextEntry ? "password" : "text"}
                id={f.field}
                className="w-full px-3 py-2 border rounded"
                value={user[f.field] || ""}
                onChange={(event) => change(event.target.value, f.field)}
                required
              />
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-teal-900"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? 'Logging...' : 'Login'}
        </button>
        <div className="mt-4 text-center">
          <span className="text-sm">Don't have an account?</span>{' '}
          <Link to="/register" className="text-blue-950 underline">
            Create Your Account
          </Link>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex-grow h-px bg-gray-400"></div>
          <span className="flex-shrink text-sm text-gray-500 px-4">OR</span>
          <div className="flex-grow h-px bg-gray-400"></div>
        </div>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
        
          render={renderProps => (
            <button
              className="flex items-center justify-center mt-4 p-2 border rounded bg-white shadow hover:bg-gray-100 w-full"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled || isLoggingIn}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google logo" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
          )}
        />

        <FacebookLogin
          appId="960103055799422"
          autoLoad={false}
          fields="name,email,picture"
          
          onSuccess={(response) => {
            setFb(response)
            console.log(response)
          }}
          onFailure={(error) => {
            setFb(null)
          }}

          callback={responseFacebook}
        />
        <div className='mt-5'>
          <Link to="/" className="text-green-700 text-sm justify-center">
            Trải nghiệm ngay không cần đăng nhập!
          </Link>
        </div>
        
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
