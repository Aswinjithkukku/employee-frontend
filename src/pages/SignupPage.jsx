import React, { useEffect, useState } from "react";
import { GiSupersonicArrow } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import { setUser } from "../redux/slices/userSlice";
import BtnLoader from "../components/BtnLoader";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPasword] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);
      const response = await axios.post("/users/signup", {
        email,
        name,
        password,
      });

      dispatch(setUser(response.data));
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      if (err?.response?.data?.error === "Invalid credentials") {
        setError("You have given incorrect email or password");
      } else {
        err?.response?.data?.status === 500
          ? setError("Something went wrong!!!")
          : setError(err?.response?.data?.error);
      }
      setIsLoading(false);
    }
  };

  const { isLoggedIn } = useSelector((state) => state.users);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <section className="py-10 flex items-center justify-center h-screen">
      <div className="container px-4 mx-auto">
        <div className="flex max-w-md mx-auto flex-col text-center">
          <h1 className="text-3xl font-[900] text-gray-600">Welcome</h1>
          <form onSubmit={handleSubmit}>
            <div className="mt-12 mb-8 p-8 bg-white rounded-lg shadowm ">
              <span
                onClick={() => navigate("/signup")}
                className="text-sm text-blue-400 cursor-pointer"
              >
                Click here to Login !!
              </span>
              <h4 className="mb-6 text-3xl">Signup to new account</h4>
              <div className="flex mb-4 px-4 bg-blueGray-50 rounded">
                <input
                  className="w-full py-4 text-sm placeholder-blueGray-400 font-semibold leading-none bg-blueGray-50 outline-none"
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex mb-4 px-4 bg-blueGray-50 rounded">
                <input
                  className="w-full py-4 text-sm placeholder-blueGray-400 font-semibold leading-none bg-blueGray-50 outline-none"
                  type="email"
                  placeholder="Enter Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <svg
                  className="h-6 w-6 ml-4 my-auto text-blueGray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  ></path>
                </svg>
              </div>
              <div className="flex mb-6 px-4 bg-blueGray-50 rounded">
                <input
                  className=" w-full py-4 text-sm placeholder-blueGray-400 font-semibold leading-none bg-blueGray-50 outline-none"
                  type={viewPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {!viewPassword ? (
                  <p
                    onClick={() => setViewPasword(true)}
                    className="ml-4 text-2xl"
                  >
                    <AiOutlineEye />
                  </p>
                ) : (
                  <p
                    onClick={() => setViewPasword(false)}
                    className="ml-4 text-2xl"
                  >
                    <AiOutlineEyeInvisible />
                  </p>
                )}
              </div>
              {error && <p className="text-[12px] text-red-500">{error}</p>}
              <button
                type="submit"
                className="block w-full p-4 text-center text-xs text-white font-semibold leading-none bg-blue-600 hover:bg-blue-700 rounded"
              >
                {isLoading ? <BtnLoader /> : " Sign Up"}
              </button>
            </div>
          </form>
          <div>
            <p className="text-xs text-blueGray-400 text-center">
              <p className="underline hover:text-blueGray-500">
                Police privacy
              </p>{" "}
              and{" "}
              <p className="underline hover:text-bluegray-500">Terms of Use</p>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
