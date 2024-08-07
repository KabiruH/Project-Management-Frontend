import TinyBarChart from "../../../../components/TinyChart";
import { Counter } from "../Counter";
const AwardGainedParticipantCard = ({barData})=>{
    return(

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
    )
}

export default AwardGainedParticipantCard;