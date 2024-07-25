import React, { useEffect, useState } from "react";
import Layout from '../components/layout'
import Chart from "../components/Chart"
import {getInstitutions} from "../services/institutionS"
import {getParticipant} from "../services/participantS"
import {getPartnership} from "../services/partnershipS"
import {getProjects} from "../services/projectService"
import { GoOrganization } from "react-icons/go";
import { FaHandshake } from "react-icons/fa";

import { MdGroups2 } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";

export default function DashboardStatsGrid() {
const [awardCenters,setAwardCenters]=useState([])
const [participants,setParticipants] = useState([])
const [projects,setProjects] = useState([])
const [partners,setPartners] = useState([])
useEffect(()=>{
getI()
},[])

const getI = async()=>{
  const data = await getInstitutions()
  const participants = await getParticipant()
  const projects = await getProjects()
  const partners = await getPartnership()

setAwardCenters(data)
setParticipants(participants)
setProjects(projects)
setPartners(partners)
}

  return (
    <Layout>
    <div className="px-5 grid grid-cols-1 md:grid-cols-4 gap-4 ">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center ">
          <GoOrganization className="text-4xl text-primary" />
        </div>
        <div className="pl-4 flex flex-col justify-center items-center">
          <span className="text-md text-main font-[600]">Total Award Centers</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 text-center font-semibold">
              {awardCenters.length}
            </strong>
           
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center ">
          <MdGroups2 className="text-4xl text-primary" />
        </div>
        <div className="pl-4 flex flex-col justify-center items-center">
          <span className="text-md text-main font-[600]">
            Total Participants
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {participants.length}
            </strong>
            
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center ">
          <GoProjectSymlink className="text-4xl text-primary" />
        </div>
        <div className="pl-4 flex flex-col justify-center items-center">
          <span className="text-md text-main font-[600]">
             Projects
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {projects.length}
            </strong>
            
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center ">
          <FaHandshake className="text-4xl text-primary" />
        </div>
        
        <div className="pl-4 flex flex-col justify-center items-center">
          <span className="text-md text-main font-[600]">Partners</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {partners.length}
            </strong>
          </div>
        </div> 
      </BoxWrapper>
      
    </div>
    <div className="w-full">
    <Chart participants={participants} />
      </div>
    </Layout>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white  rounded-md p-4 flex-2 cursor-pointer px-3   hover:scale-105 hover:z-10 translate-x-4  flex items-center"  style={{ boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)' }}>
      {children}
    </div>
    
  );
}
