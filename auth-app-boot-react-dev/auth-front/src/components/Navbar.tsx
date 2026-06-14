import React from "react";
import { Button } from "./ui/button";
import { NavLink, useNavigate } from "react-router";
import useAuth from "@/auth/store";

function Navbar() {
  const checkLogin = useAuth((state) => state.checkLogin);
  const user = useAuth((state) => state.user);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  return (
    <nav className="py-5  dark:border-b border-gray-700 md:py-0 flex md:flex-row gap-4 md:gap-0 flex-col md:h-14 justify-around items-center    ">
      {/* brand */}
      <div className="font-semibold items-center flex gap-2">
       {/* Logo mark */}

        
       <span className="relative inline-block h-6 w-6 shrink-0">
         <svg viewBox="0 0 64 72" className="h-full w-full">
           <defs>
             <clipPath id="shieldClip">
               <path d="M32 1 L62 10.5 V36 C62 55 49 64.5 32 70 C15 64.5 2 55 2 36 V10.5 Z" />
             </clipPath>
           </defs>

           {/* Two-tone fill */}
           <g clipPath="url(#shieldClip)">
             <rect width="64" height="20" fill="#e11d2a" />
             <rect y="20" width="64" height="56" fill="#0a0a0a" />
           </g>

           {/* Border so it stands out on dark navbars */}
           <path
             d="M32 1 L62 10.5 V36 C62 55 49 64.5 32 70 C15 64.5 2 55 2 36 V10.5 Z"
             fill="none"
             stroke="#f5f5f5"
             strokeWidth="2"
           />

           {/* "A" letter */}
           <text
             x="32"
             y="42"
             textAnchor="middle"
             dominantBaseline="central"
             fontSize="30"
             fontWeight="700"
             fill="#f5f5f5"
           >
             A
           </text>
         </svg>
       </span>

       <span className="text-base tracking-tight">Auth App</span>
     </div>


      

      <div className="flex gap-4 items-center">
        {checkLogin() ? (
          <>
            <NavLink to={"/dashboard/profile"}>{user?.name}</NavLink>

            <Button
              onClick={() => {
                logout();
                navigate("/");
              }}
              size={"sm"}
              className="cursor-pointer"
              variant={"outline"}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/login"}>
              <Button
                size={"sm"}
                className="cursor-pointer"
                variant={"outline"}
              >
                Login
              </Button>
            </NavLink>
            <NavLink to={"/signup"}>
              <Button
                size={"sm"}
                className="cursor-pointer"
                variant={"outline"}
              >
                Signup
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
