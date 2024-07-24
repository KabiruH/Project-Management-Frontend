import React from "react";
import Layout from '../components/layout'
import Chart from "../components/Chart"
// report

//report
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";

export default function DashboardStatsGrid() {



  return (
    <Layout>
    <div className="flex justify-evenly w-full flex-col md:flex-row gap-4 ">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Award Centers</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              4232
            </strong>
           
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Participants
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              $3423
            </strong>
            
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Award Leaders
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              12313
            </strong>
            
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <IoCart className="text-2xl text-white" />
        </div>
        
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Regions Covered</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              16432
            </strong>
          </div>
        </div> 
      </BoxWrapper>
      
    </div>
    <div className="w-full">
    <Chart/>
      </div>
    </Layout>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-md p-4 flex-2 cursor-pointer px-3   hover:scale-105 hover:z-10 translate-x-4  border border-gray-200 flex items-center">
      {children}
    </div>
    
  );
}
