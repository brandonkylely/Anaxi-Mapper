import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai/react";
import { useNavigate } from "react-router-dom";
import token from "../utils/token";
import { userAtom, MapperUser } from "../state";
import tokenUtil from "../utils/token";


export default function Logout() {
    const navigate = useNavigate();
    const [user, setUser] = useAtom(userAtom);
    
    const logout = function(){
        tokenUtil.logout();
        setUser(null);
        console.log('on click logout!')
        localStorage.clear();
        //navigates back to home page, maybe change to login page?
        navigate("/login");
    }

  return (
    <>
        <div className="card-body p-10 m-5">
          
          <div className=" flex justify-center font-bold text-xl justify-center font-semibold tracking-widest">
            <h2>Are you sure you want to logout?</h2>
          </div>
          <div className="flex justify-center space-x-4 m-4 " >
          <button
            onClick={logout} 
            className=" btn-primary pl-4 pr-4 px-2 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 shadow-sm appearance-none rounded-md bg-white"
          >
            LOGOUT
          </button>

          {/* <button
            onClick={returnHome}
            className=" btn btn-primary pl-4 pr-4 px-2 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 shadow-sm appearance-none rounded-md bg-white"
          >
            go back
          </button> */}
          </div>
        </div>

    </>
  );
}


