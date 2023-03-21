import { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai/react";
import { useNavigate } from "react-router-dom";
import token from "../utils/token";
import { userAtom, MapperUser } from "../state";
import tokenUtil from "../utils/token";

export default function Logout() {
    const [user, setUser] = useAtom(userAtom);
    
    const logout = function(){
        tokenUtil.logout();
        setUser(null);
        console.log('on click logout!')
    }
    const returnHome = function(){
    }
  return (
    <>
        <div className="form-outline space-y-4 rounded-lg tracking-wide">
          <div className="font-bold text-xl justify-center font-semibold tracking-widest">
            <h2>Are you sure you want to logout?</h2>
          </div>
          <button
            onClick={logout} 
            className="btn btn-primary pl-4 pr-4 px-2 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 shadow-sm appearance-none rounded-md bg-white"
          >
            Logout
          </button>

          <button
            onClick={returnHome}
            className="btn btn-primary pl-4 pr-4 px-2 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 shadow-sm appearance-none rounded-md bg-white"
          >
            Go Back
          </button>
        </div>

    </>
  );
}


