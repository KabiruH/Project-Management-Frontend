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
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="relative flex items-center justify-center bg-center" style={{ backgroundImage: 'url(https://img.freepik.com/free-vector/abstract-circular-geometric-element-vector_53876-77761.jpg?w=1060&t=st=1718802209~exp=1718802809~hmac=dd957b150521048abad4c8471a135876f3755a930ad330d27df23d0354909776)' }}>
        <video
          ref={videoRef}
          src={require("./videoplayback.mp4")}
          className=" border-4 border-white"
          style={{
            width: '50%', 
            height: '50%',
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
      </header>

      <main className="px-8 py-16 lg:px-32">
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to The President's <span className="text-rose-600">Award</span> - Kenya</h1>
          <p className="text-lg md:text-xl text-gray-300">Whether you're looking to learn something new, connect with like-minded individuals, or simply have a good time, MIMiK has an event for you.</p>
        </section>

        <section className="flex flex-col lg:flex-row items-center justify-center gap-6">
          <Link to="/signin">
            <button className="bg-rose-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-rose-700 transition">
              Get started <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </Link>
          <Link to="/signin">
            <button className="bg-rose-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-rose-700 transition">
              <i className="fa-solid fa-calendar-days mr-2"></i> See all Events <i className="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </Link>
          <Link to="https://www.presidentsaward.or.ke/contact-us/">
            <button className="bg-rose-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-rose-700 transition">
              Contact Us
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}
