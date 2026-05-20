'use client'; // bo używa useState

import { useState } from 'react';

export default function Portfolio() {
  const [isOpen, setIsOpen] = useState(false);

  const videos = [
    { src: 'Gosia&Grzegorz.mp4', title: 'Gosia & Grzegorz Wedding' },
    { src: 'Lanzarote_1.mp4', title: 'Lanzarote Adventure Part 1' },
    { src: 'Ford-LTD.mp4', title: 'Ford LTD Showcase' },
    { src: 'Lanzarote_2.mp4', title: 'Lanzarote Adventure Part 2' },
  ];

  return (
    <section 
      id="portfolio" 
      className={`portfolio ${isOpen ? 'open' : 'collapsed'}`}
    >
      <h2 
        className="portfolio-title" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide portfolio ↑' : 'A few of our projects ↓'}
      </h2>

      <div className="videos-wrapper">
        <div className="videos">
          {videos.map((video, index) => (
            <video 
              key={index} 
              controls 
              preload="metadata"
              aria-label={video.title}
            >
              <source src={`/videos/${video.src}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
        </div>
      </div>
    </section>
  );
}