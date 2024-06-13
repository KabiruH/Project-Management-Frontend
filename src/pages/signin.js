import React from 'react';


export default function SignIn() {
  return (
    <div className='main-container w-[1920px] h-[1152px] bg-[#fff] relative overflow-hidden mx-auto my-0'>
      <div className='w-[965px] h-[1152px] absolute top-0 left-[960px] z-[34]'>
        <div className='w-[190px] h-[190px]  bg-cover bg-no-repeat rounded-[50%] relative z-[45] mt-[348px] mr-0 mb-0 ml-[371px]' />
        <span className="flex w-[301px] h-[46px] justify-center items-start font-['Plus_Jakarta_Sans'] text-[32px] font-extrabold leading-[45.415px] text-[#000] relative text-center whitespace-nowrap z-[36] mt-[15px] mr-0 mb-0 ml-[331px]">
          Organization Name
        </span>
        <span className="flex w-[580px] h-[46px] justify-center items-start font-['Plus_Jakarta_Sans'] text-[40px] font-bold leading-[45.415px] text-[#000] tracking-[2px] relative text-center whitespace-nowrap z-[35] mt-[60px] mr-0 mb-0 ml-[192px]">
          Project Management Portal
        </span>
        <div className='w-[622px] h-[60px] relative z-[43] mt-[357px] mr-0 mb-0 ml-[308px]'>
          <div className='w-[60px] h-[60px]  bg-cover bg-no-repeat rounded-[50%] absolute top-0 left-[562px] z-[42]' />
          <div className='w-[18px] h-[18px] absolute top-[21px] left-[583px] overflow-hidden z-[43]'>
            <div className='w-[16.087px] h-[18px]  bg-[length:100%_100%] bg-no-repeat relative z-[44] mt-0 mr-0 mb-0 ml-[0.96px]' />
          </div>
          <button className="w-[88px] h-[24px] font-['DM_Sans'] text-[14px] font-medium leading-[24px] text-[#000] border-none tracking-[-0.28px] absolute top-1/2 left-0 translate-x-0 translate-y-[-16.67%] whitespace-nowrap z-[39] pointer" />
          <button className="w-[106px] h-[24px] font-['DM_Sans'] text-[14px] font-medium leading-[24px] text-[#000] border-none tracking-[-0.28px] absolute top-1/2 left-[186px] translate-x-0 translate-y-[-16.67%] whitespace-nowrap z-40 pointer" />
        </div>
      </div>
      <span className="flex h-[56px] justify-start items-start font-['DM_Sans'] text-[36px] font-bold leading-[56px] text-[#000] tracking-[-0.72px] absolute top-[271px] left-[308px] text-left whitespace-nowrap z-[32]">
        Sign In
      </span>
      <span className="flex h-[16px] justify-start items-start font-['DM_Sans'] text-[16px] font-normal leading-[16px] text-[#000] tracking-[-0.32px] absolute top-[335px] left-[309px] text-left whitespace-nowrap z-[33]">
        Enter your username and password to sign in!
      </span>
      <div className="w-[72px] h-[14px] font-['DM_Sans'] text-[14px] font-medium leading-[14px] tracking-[-0.28px] absolute top-[411px] left-[309px] text-left whitespace-nowrap z-[24]">
        <span className="font-['DM_Sans'] text-[14px] font-medium leading-[14px] text-[#000] tracking-[-0.28px] relative text-left">
          Username
        </span>
        <span className="font-['DM_Sans'] text-[14px] font-medium leading-[14px] text-[#000] tracking-[-0.28px] relative text-left">
          *
        </span>
      </div>
      <div className='w-[21.35%] h-[4.34%] border-solid border border-[#000] absolute top-[38.02%] left-[16.09%] z-[27]'>
        <input className='w-[410px] h-[50px] bg-transparent border-none absolute top-[-1px] left-[-1px] z-30' />
      </div>
      <div className="w-[68px] h-[14px] font-['DM_Sans'] text-[14px] font-medium leading-[14px] tracking-[-0.28px] absolute top-[512px] left-[309px] text-left whitespace-nowrap z-[15]">
        <span className="font-['DM_Sans'] text-[14px] font-medium leading-[14px] text-[#000] tracking-[-0.28px] relative text-left">
          Password
        </span>
        <span className="font-['DM_Sans'] text-[14px] font-medium leading-[14px] text-[#000] tracking-[-0.28px] relative text-left">
          *
        </span>
      </div>
      <div className='w-[21.35%] h-[4.34%] border-solid border border-[#000] absolute top-[46.79%] left-[16.09%] z-[18]'>
        <input className='w-[410px] h-[50px] bg-transparent border-none absolute top-[-1px] left-[-1px] z-[21]' />
      </div>
      <span className="flex h-[20px] justify-start items-start font-['DM_Sans'] text-[14px] font-normal leading-[20px] text-[#000] tracking-[-0.28px] absolute bottom-[512px] left-[338px] text-left whitespace-nowrap z-[8]">
        Keep me logged in
      </span>
      <span className="flex h-[20px] justify-start items-start font-['DM_Sans'] text-[14px] font-medium leading-[20px] text-[#000] tracking-[-0.28px] absolute top-[620px] left-[589px] text-left whitespace-nowrap z-[13]">
        Forget password?
      </span>
      <div className='w-[18px] h-[18px] bg-[#000] absolute top-[622px] left-[309px] z-[9]'>
        <div className='w-[16px] h-[16px] relative overflow-hidden z-10 mt-px mr-0 mb-0 ml-px'>
          <div className='w-[11.314px] h-[8.014px] bg-[length:100%_100%] bg-no-repeat relative z-[11] mt-[3.986px] mr-0 mb-0 ml-[2.424px]' />
        </div>
      </div>
      <div className='flex w-[410px] h-[54px] pt-[10px] pr-[8px] pb-[10px] pl-[8px] gap-[10px] justify-center items-center flex-nowrap bg-[#000] absolute top-[673px] left-[309px] z-[4]'>
        <span className="flex w-[43px] h-[14px] justify-center items-start shrink-0 basis-auto font-['DM_Sans'] text-[14px] font-bold leading-[14px] text-[#fff] tracking-[-0.28px] relative text-center whitespace-nowrap z-[5]">
          Sign In
        </span>
      </div>
      <div className="w-[244px] h-[26px] font-['DM_Sans'] text-[14px] font-bold leading-[26px] tracking-[-0.28px] absolute top-[753px] left-[309px] text-left whitespace-nowrap z-[2]">
        <span className="font-['DM_Sans'] text-[14px] font-normal leading-[26px] text-[#000] tracking-[-0.28px] relative text-left">
          Not registered yet?
        </span>
        <span className="font-['DM_Sans'] text-[14px] font-bold leading-[26px] text-[#707eae] tracking-[-0.28px] relative text-left">
          
        </span>
        <span className="font-['DM_Sans'] text-[14px] font-bold leading-[26px] text-[#000] tracking-[-0.28px] relative text-left">
          Create
        </span>
        <span className="font-['DM_Sans'] text-[14px] font-bold leading-[26px] text-[#4218ff] tracking-[-0.28px] relative text-left">
          
        </span>
        <span className="font-['DM_Sans'] text-[14px] font-bold leading-[26px] text-[#000] tracking-[-0.28px] relative text-left">
          an Account
        </span>
      </div>
      <span className="flex h-[24px] justify-start items-start font-['DM_Sans'] text-[14px] font-medium leading-[24px] text-[#000] tracking-[-0.28px] absolute top-[calc(50%--512px)] left-[309px] text-left whitespace-nowrap z-[38]">
        © 2024 Optimum Computer Systems. All Rights Reserved.
      </span>
    </div>
  );
}
