import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLoginMode, addUserData } from "../Utils/Redux/userSlice";
import { useCreateAccount, useLoginAccount } from "../Utils";
import dotenv from "dotenv";
dotenv.config();
const Login = () => {
  var [loginAccountDetailes, setLoginAccount] = useState({
    gmail: "",
    password: "",
  });
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [gmail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const toggleMode = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };
  return (
    <div className="container pb-24 ">
      <form onSubmit={(e) => e.preventDefault()}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-300"
          onClick={() => dispatch(addLoginMode())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="card">
          {isLoginMode ? (
            <>
              <p className="mt-6 text-gray-600">Login to Your Account</p>
              <div className="inputBox1">
                <input
                  type="gmail"
                  onChange={(e) =>
                    setLoginAccount({
                      ...loginAccountDetailes,
                      gmail: e.target.value,
                    })
                  }
                  value={loginAccountDetailes.name}
                  required
                />
                <span className="user">Gmail</span>
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  onChange={(e) =>
                    setLoginAccount({
                      ...loginAccountDetailes,
                      password: e.target.value.toString(),
                    })
                  }
                  value={loginAccountDetailes.password}
                  required
                />
                <span>Password</span>
              </div>

              <button
                className="enter"
                onClick={() => {
                  const data = useLoginAccount(loginAccountDetailes);
                  data.then((data) => {
                    dispatch(addUserData(data));
                  });
                }}
              >
                Login
              </button>
            </>
          ) : (
            <>
              <p className="mt-6 text-gray-600">
                Create Account and Order The Food
              </p>
              <div className="inputBox1">
                <input
                  type="gmail"
                  value={gmail}
                  onChange={(e) => setMail(e.target.value)}
                  required="required"
                />
                <span className="user">Gmail</span>
              </div>

              <div className="inputBox">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <span>Username</span>
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.toString())}
                  required="required"
                />
                <span>Password</span>
              </div>

              <button
                className="enter"
                onClick={() => useCreateAccount(name, gmail, password)}
              >
                Create Account
              </button>
            </>
          )}

          <div className=" flex items-center justify-center">
            <button
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={toggleMode}
            >
              {isLoginMode ? "Switch to Create Account" : "Switch to Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { Login };
