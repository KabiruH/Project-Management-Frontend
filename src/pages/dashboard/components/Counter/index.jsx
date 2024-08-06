import ScrollTrigger from "react-scroll-trigger";
import CountUp from "react-countup";
import { useState } from "react";

export const Counter = () => {
  const [counter, setCounter] = useState(false);
  return (
    <section className="w-full">
      <ScrollTrigger
        onEnter={() => setCounter(true)}
        onExit={() => setCounter(false)}
      >
        <div className="flex flex-col items-center w-full ">
         { [{no: 200,name: "Bronze"},{no: 240,name: "Silver"},{no: 120, name: "Gold"}].map((i)=>(<div className=" w-full flex justify-between">
          <span className="text-[rgba(192, 192, 192, 0.2)] font-[900] font-poppins  text-[16px]  md:text-[20px] lg:text-[20px]">{i.name}</span> <span className="font-[600] font-poppins"> {counter && <CountUp end={i.no} />}</span>
          <hr></hr>
          </div>))}
        </div>
      </ScrollTrigger>
    </section>
  );
};