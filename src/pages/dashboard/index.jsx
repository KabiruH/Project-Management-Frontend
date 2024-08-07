import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import Chart from "../../components/Chart";
import { getInstitutions } from "../../services/institutionS";
import { getParticipant } from "../../services/participantS";
import { getPartnership } from "../../services/partnershipS";
import { getProjects } from "../../services/projectService";
import { GoOrganization } from "react-icons/go";
import { FaHandshake } from "react-icons/fa";
import UserMap from "../../components/Map";
import { FcBusinessman } from "react-icons/fc";
import { FcBusinesswoman } from "react-icons/fc";
import { Counter } from "./components/Counter";
import { MdGroups2 } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import TinyBarChart from "../../components/TinyChart";

export default function DashboardStatsGrid() {
  const [awardCenters, setAwardCenters] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [projects, setProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getI();
  }, []);

  const getI = async () => {
    const data = await getInstitutions();
    const participants = await getParticipant();
    const projects = await getProjects();
    const partners = await getPartnership();

    setAwardCenters(data);
    setParticipants(participants);
    setProjects(projects);
    setPartners(partners);
  };

  const barData = {
    labels: ["Bronze", "Silver", "Gold","Bronze & Gold", "Silver & Gold","Silver & Bronze"],
    datasets: [
      {
        label: "Highest Participants per Award Level",
        data: [10, 15, 20,10],
        backgroundColor: [
          "rgba(205, 127, 50, 0.2)", // Br  onze color
          "rgba(192, 192, 192, 0.2)", // Silver color
          "rgba(255, 215, 0, 1)", // Gold color
          "rgba(255, 215, 0, 0.2)", // Gold color
        ],
        borderColor: [
          "rgba(205, 127, 50, 1)", // Bronze color
          "rgba(192, 192, 192, 1)", // Silver color
          "rgba(255, 215, 0, 1)", // Gold color
          "rgba(255, 215, 0, 1)", // Gold color
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    
    <Layout>
      <div className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2  md:gap-3  ">
        <BoxWrapper
          className="bg-red-200 bg-card-bg-1"
          onclick={() => navigate("/institutions/addInstitutions")}>
          <div className="rounded-full  flex items-center justify-center ">
            <GoOrganization className="text-4xl text-primary" />
          </div>
          <div className=" flex flex-col justify-center items-center">
            <span className="text-[24px] text-main font-[600]">
              Total Award Centers
            </span>
          </div>
          <span className="subtitle2 ml-auto mr-4 text-primary">
            {awardCenters.length}
          </span>
        </BoxWrapper>
        <BoxWrapper
          className="bg-blue-200 bg-card-bg-3 gap-2"
          onclick={() => navigate("/participants/participant")}>
          <div className="rounded-full flex items-center justify-center ">
            <MdGroups2 className="text-4xl text-primary" />
          </div>
          <div className=" flex flex-col justify-center ">
            <span className="text-[20px] text-main font-[600]">
              Total Participants
            </span>
            <div className="flex items-center gap-2 mt-3">
              <strong className="text-xl text-gray-700 flex justify-center items-center gap-1 font-semibold">
                <span>
                  <FcBusinessman className="text-primary text-[30px]" />
                </span>
                <span>
                  {participants.filter((p) => p.gender === "male").length}{" "}
                </span>
              </strong>
              <strong className="text-xl text-gray-700 flex justify-center items-center gap-1 font-semibold">
                <span>
                  <FcBusinesswoman className="text-primary text-[30px]" />
                </span>
                <span>
                  {participants.filter((p) => p.gender === "Female").length}
                </span>
              </strong>
            </div>
          </div>
          <span className="subtitle2 ml-auto mr-4 text-primary">
            {participants.length}
          </span>
        </BoxWrapper>
        <BoxWrapper
          className="bg-green-300 bg-card-bg-2"
          onclick={() => navigate("/project/project")}>
          <div className="rounded-full flex items-center justify-center ">
            <GoProjectSymlink className="text-4xl text-primary" />
          </div>
          <div className=" flex flex-col justify-center items-center">
            <span className="text-[24px] text-main font-[600]">Projects</span>
          </div>
          <span className="subtitle2 ml-auto mr-4 text-secondary">
            {projects.length}
          </span>
        </BoxWrapper>
        <BoxWrapper
          className="bg-black bg-card-bg-1 gap-3"
          onclick={() => navigate("/partnership/partnership")}>
          <div className="rounded-full  flex items-center justify-center ">
            <FaHandshake className="text-4xl text-white" />
          </div>

          <div className=" flex flex-col justify-center items-center">
            <span className="text-[24px] text-white font-[600]">Partners</span>
          </div>
          <span className="subtitle2 ml-auto mr-4 text-white">
            {partners.length}
          </span>
        </BoxWrapper>
      </div>
      <div className="w-full grid  grid-cols-1 z-0 pb-6 h-full  md:grid-cols-1 lg:grid-cols-2">
        <Chart participants={participants} />
        <div className="w-full h-full grid grid-row-2 mt-10">
          <div className="w-full grid grid-cols-1 md:grid-cols-2  p-2 gap-1">
            <div
              className="p-2 bg-white rounded-lg shadow-lg flex flex-col justify-around"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)",
              }}>
              <h2 className="font-semibold text-xl pb-4 text-gray-800">
                Award Gained Participants
              </h2>
              <div className="flex p-3 items-center justify-between w-full rounded-md">
                <Counter />
              </div>
              <div>
              <TinyBarChart data={barData} />
              </div>
            </div>

            <div
              className="p-6 bg-white rounded-lg shadow-md"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)",
              }}>
              <h2 className="font-semibold text-xl pb-4 text-gray-800">
                Projects summary
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-green-100 rounded-md">
                  <span>Active Projects</span>
                  <span className="font-bold text-green-700">10</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-100 rounded-md">
                  <span>Completed Projects</span>
                  <span className="font-bold text-blue-700">8</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-100 rounded-md">
                  <span>Not started Projects</span>
                  <span className="font-bold text-red-700">2</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-2 h-full">
          <UserMap />
          </div>
        </div>
      </div>
    </Layout>
    
  );
}

function BoxWrapper({ children, onclick, className }) {
  return (
    <div
      onClick={onclick}
      className={`${className} gap-1  bg-cover bg-center  rounded-md p-4 flex cursor-pointer px-3   hover:scale-105  hover:z-10  transition-all ease-in-out duration-300  `}
      style={{
        boxShadow:
          "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)",
      }}>
      {children}
    </div>
  );
}
