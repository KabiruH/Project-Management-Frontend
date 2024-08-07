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
import { MdGroups2 } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import BoxWrapper from "../../components/BoxWrapper"
import AwardGainedParticipantCard from "./components/AwardGainedParticipantsCard";
import ProjectsSummaryCard from "./components/ProjectsSummaryCard";
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
        label: "Highest Award gained per Award Level",
        data: [10, 15, 20,10],
        backgroundColor: [
          "rgba(205, 127, 50, 0.2)", // Bronze color
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

const dashboardCardsConfig = [
  {
    path: "/institutions/addInstitutions",
    bgColor: "bg-red-200",
    bgImage: "bg-card-bg-3",
    Icon: <GoOrganization className="text-4xl text-primary" />,
    textColor: "text-main",
    primaryText: "Total Award Centers",
    secondaryText: awardCenters.length,
    children: false
  },
  {
    path: "/participants/participant",
    bgColor: "bg-blue-200",
    bgImage: "bg-card-bg-1",
    Icon:  <MdGroups2 className="text-4xl text-primary" />,
    textColor: "text-main",
    primaryText: "Total Participants",
    secondaryText: awardCenters.length,
    children: true
  },
  {
    path: "/project/project",
    bgColor: "bg-green-300",
    bgImage: "bg-card-bg-2",
    Icon: <GoProjectSymlink className="text-4xl text-primary" />,
    textColor: "text-main",
    primaryText: "Projects",
    secondaryText: projects.length,
    children: false
  },
  {
    path: "/partnership/partnership",
    bgColor: "bg-black",
    bgImage: "bg-card-bg-2",
    Icon: <FaHandshake className="text-4xl text-white" />,
    textColor: "text-white",
    primaryText: "Partners",
    secondaryText: partners.length,
    children: false
  },
];


  return (
    <Layout>
      <div className="px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2  md:gap-3  ">
        {dashboardCardsConfig.map((config) => (
          <BoxWrapper
            className={` ${config.bgColor} ${config.bgImage}`}
            onclick={() => navigate(config.path)}>
            <div className="rounded-full  flex items-center justify-center ">
              {config.Icon}
            </div>
            <div className=" flex flex-col justify-center items-center">
              <span
                className={`  ${
                  config.children ? "text-[20px]" : "text-[24px]"
                }  ${config.textColor} font-[600]`}>
                {config.primaryText}
              </span>
              {config.children && (
              <div className="flex  items-center gap-2 mt-3">
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
            )}
            </div>
             {!config.children &&
              <span className={`subtitle2 ml-auto mr-4  ${config.textColor}`}>
                {config.secondaryText}
              </span>
            }
            {config.children && (
              <span className="subtitle2 ml-auto mr-4 text-primary">
                {participants.length}
              </span>
            )}
          </BoxWrapper>
        ))}
      </div>
      <div className="w-full grid  grid-cols-1 z-0 pb-6 h-full  md:grid-cols-1 lg:grid-cols-2">
        <Chart participants={participants} />
        <div className="w-full h-full grid grid-row-2 mt-10">
          <div className="w-full grid grid-cols-1 md:grid-cols-2  p-2 gap-1">
            <AwardGainedParticipantCard barData={barData} />
            <ProjectsSummaryCard barData={barData} />
          </div>
          <div className="w-full p-2 h-full">
            <UserMap />
          </div>
        </div>
      </div>
    </Layout>
  );
}


