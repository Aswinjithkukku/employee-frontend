import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/userSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="bg-blue-800  w-full shadowm ">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center h-16 ">
          <div
            onClick={() => navigate("/")}
            className="font-[800] text-white text-2xl cursor-pointer"
          >
            Employees
          </div>
          <div className="">
            <p
              onClick={() => dispatch(logoutUser())}
              className="flex gap-2 text-2xl text-white cursor-pointer hover:scale-105"
            >
              <AiOutlineLogout />
              <span className="text-base font-[500]">Logout</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
