import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div>
      <div className="h-screen">
        <div className="relative h-[98%] flex items-center w-full justify-end pr-40 bg-[url(https://img.freepik.com/free-photo/blue-designed-grunge-concrete-texture-vintage-background-with-space-text-image_1258-108928.jpg)] bg-cover">
          <video
            ref={videoRef}
            src={require("./videoplayback.mp4")}
            className="rounded-full "
            style={{
              width: '80%',
              height: '80%',
              objectFit: 'cover',
              
            }}
            muted
            autoPlay
            loop
          />
          <button
            onClick={toggleMute}
            className="absolute top-4 right-4 bg-gray-800 text-white p-2 rounded-full"
          >
            {isMuted ? 'Unmute' : 'Mute'}
          </button>
        </div>
        <div className="text-white text-xl flex flex-col pl-40 justify-center gap-6 absolute top-20 h-full w-full">
          <h1 className="text-6xl font-semibold uppercase">
            The President's <br />
            <span className="text-rose-600">Award</span> - Kenya.
          </h1>
          <p>
            Whether you're looking to learn something new,
            <br /> connect with like-minded individuals, or simply have a good
            time, <br />
            MIMiK has an event for you.
          </p>

          <Link to="/signin">
            <button className="bg-rose-600 rounded-lg w-48 p-2 text-white hover:opacity-80">
              Get started <i className="fa-solid fa-arrow-right ml-1"></i>
            </button>
          </Link>
          <Link to="/signin">
            <button className="bg-rose-600 rounded-lg w-48 p-2 text-white hover:opacity-80">
              <i className="fa-solid fa-calendar-days mr-2"></i>See all Events
              <i className="fa-solid fa-arrow-right ml-1"></i>
            </button>
          </Link>

          <Link
          to="https://www.presidentsaward.or.ke/contact-us/"
            >
          <button className="bg-rose-600 rounded-lg w-48 p-2 text-white hover:opacity-80">
          Contact Us
          </button>
        </Link>

        </div>
       
        
      </div>

    </div>
  );
}






