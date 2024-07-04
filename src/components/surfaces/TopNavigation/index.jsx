import { IoPersonAddSharp } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


import Button from "../../common/Button";
import React, { useEffect, useRef,useState } from "react";
import ButtonWithIcon from "../../common/ButtonWithIcon";

const buttonConfig = [{Icon: <IoPersonAddSharp  className="text-white body1" /> ,name: 'Sign Up',path: 'signup'},{Icon: <IoLogInOutline className="text-white body1" />, name: "Sign In",path: 'signin'}]


const TopNavigation = ({timeline}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  let logo = useRef(null)
  let button1 = useRef(null)
  let navigate = useNavigate()

  useEffect(() => {
    timeline
      .from(logo, {
        duration: 0.5,
        opacity: 0,
        y: 100,
      })
      .from(
        button1,
        {
          duration: 0.4,
          opacity: 0,
          y: 100,
        },
        "-=.5"
      );

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [timeline]);

  return (
    <div className={`w-full flex bg-secondary py-4 items-center justify-between pl-4 sticky  top-0 absolute z-[100] ${
      isScrolled ? "bg-secondary shadow-md shadow-white" : "bg-secondary"
    }`}>
      <div className="flex items-center" ref={el=> logo = el}>
        <img
          src="../assets/logo-with-bg.png"
          alt="Logo"
          className="w-10 h-10 mr-2"
        />
        <span  className="text-xl font-bold text-white" >
          The President's Award - Kenya
        </span>
      </div>
      { openDropDown ? <div className='pr-5 md:hidden flex flex-col gap-3'>
       { buttonConfig.map(({path,...props})=><ButtonWithIcon {...props} onClick={()=>navigate(path)} />)}
      </div> :<IoMenu onClick={()=>setOpenDropDown(prev=>!prev)} type="button" className="md:hidden text-white text-[40px] mr-5" id="menu-button" aria-expanded="true" aria-haspopup="true" />}
      
      <div className="pr-5 hidden md:flex gap-3" ref={el=> button1 = el}>
      { buttonConfig.map(({path,...props})=><ButtonWithIcon {...props} onClick={()=>navigate(path)} />)}
      </div>
    </div>
  );
};

export default TopNavigation;
