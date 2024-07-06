import SingleParticipant from "./SingleParticipantCard";

const OurParticipants = ()=>{
    return(
    <div className="w-full md:p-4 ">
        <h1 className="subtitle1 ml-2">Participate with us</h1>
        <div id="participant-carousel">
           <SingleParticipant />
        </div>
    </div>
)
}

export default OurParticipants;