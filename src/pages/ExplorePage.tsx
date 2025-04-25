import React, { useState } from 'react';

interface VideoCardProps {
  title: string;
  location: string;
  userName: string;
  views: string;
  videoSrc: string;
  thumbnailSrc: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, location, userName, views, videoSrc, thumbnailSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Handle video playback state
  const handleVideoPlay = () => {
    setIsPlaying(true);
  };
  
  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md h-full">
      {/* Video with thumbnail */}
      <div className={`aspect-[9/16] bg-gray-200 relative ${isPlaying ? 'z-20' : 'z-10'}`}>
        <video 
          src={videoSrc.includes('http') ? videoSrc : `/${videoSrc}.mp4`}
          poster={thumbnailSrc}
          className="w-full h-full object-cover"
          controls
          preload="none"
          playsInline
          onPlay={handleVideoPlay}
          onPause={handleVideoPause}
        />
      </div>
      
      {/* Video info - hide when video is playing on mobile */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 md:p-4 
        ${isPlaying ? 'hidden sm:block opacity-0 sm:opacity-100 sm:hover:opacity-100' : 'opacity-100'}`}>
        <h3 className="text-white font-semibold truncate text-sm md:text-base">{title}</h3>
        <p className="text-gray-200 text-xs sm:text-sm">{location}</p>
        <div className="flex justify-between mt-1 md:mt-2 text-xs text-gray-300">
          <span>@{userName}</span>
          <span>{views} views</span>
        </div>
      </div>
    </div>
  );
};

const ExplorePage: React.FC = () => {
  // Responsive layout state
  const [layout, setLayout] = useState('grid');

  const videos = [
    { 
      title: "Amazing waterfall in Bali", 
      location: "Bali, Indonesia", 
      userName: "traveler123", 
      views: "1.2M",
      videoSrc: "snaptik_7496395230745267464",
      thumbnailSrc: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    { 
      title: "Hidden beach in Thailand", 
      location: "Phuket, Thailand", 
      userName: "beachlover", 
      views: "890K",
      videoSrc: "https://player.vimeo.com/external/368484050.sd.mp4?s=da8679b7896afd2c90583967c9293a4dd3c8cd93&profile_id=164&oauth2_token_id=57447761",
      thumbnailSrc: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    { 
      title: "City lights in Tokyo", 
      location: "Tokyo, Japan", 
      userName: "urbanexplorer", 
      views: "2.3M",
      videoSrc: "https://player.vimeo.com/external/343576563.sd.mp4?s=ca622dea7ad996149093876aa57b89cc2506e3e5&profile_id=164&oauth2_token_id=57447761",
      thumbnailSrc: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    { 
      title: "Hiking in the Alps", 
      location: "Swiss Alps", 
      userName: "mountaineer", 
      views: "756K",
      videoSrc: "https://player.vimeo.com/external/358205221.sd.mp4?s=f8cce1a4b264904d417e9a553fafc97ef4285c2e&profile_id=164&oauth2_token_id=57447761",
      thumbnailSrc: "https://images.pexels.com/photos/1366909/pexels-photo-1366909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    { 
      title: "Street food tour in Bangkok", 
      location: "Bangkok, Thailand", 
      userName: "foodie", 
      views: "1.5M",
      videoSrc: "https://player.vimeo.com/external/422488783.sd.mp4?s=978af996512e6fdb14bd3b361e75d6d1874fb77f&profile_id=164&oauth2_token_id=57447761",
      thumbnailSrc: "https://images.pexels.com/photos/2114365/pexels-photo-2114365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    { 
      title: "Secret spots in Paris", 
      location: "Paris, France", 
      userName: "eurotravel", 
      views: "980K",
      videoSrc: "https://player.vimeo.com/external/336945777.sd.mp4?s=e2df32bcd5ad8befdd69d6f5f348993683b3dd9c&profile_id=164&oauth2_token_id=57447761",
      thumbnailSrc: "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    { 
      title: "Safari adventure in Kenya", 
      location: "Masai Mara, Kenya", 
      userName: "wildlifelover", 
      views: "1.1M",
      videoSrc: "https://player.vimeo.com/external/296210754.sd.mp4?s=9db41d71fa61a2cc19757f656fc363def4d56a57&profile_id=164&oauth2_token_id=57447761",
      thumbnailSrc: "https://images.pexels.com/photos/33045/lion-wild-africa-african.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    { 
      title: "Road trip in California", 
      location: "California, USA", 
      userName: "roadtripper", 
      views: "670K",
      videoSrc: "https://player.vimeo.com/external/363625327.sd.mp4?s=ce49de847287bfdf6b251c248729aa6c637b5056&profile_id=164&oauth2_token_id=57447761",
      thumbnailSrc: "https://images.pexels.com/photos/3061467/pexels-photo-3061467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
  ];

  return (
    <div className="max-w-[100vw] overflow-hidden px-2 sm:px-4 md:px-6 lg:container lg:mx-auto py-4 md:py-6">
      {/* Page header with layout toggle */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Explore Travel Videos</h1>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setLayout('grid')}
            className={`px-3 py-1 rounded text-sm ${layout === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Grid
          </button>
          <button 
            onClick={() => setLayout('scroll')}
            className={`px-3 py-1 rounded text-sm ${layout === 'scroll' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Scroll
          </button>
        </div>
      </div>
      
      {/* Grid layout */}
      {layout === 'grid' && (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {videos.map((video, index) => (
            <div key={index} className="h-full">
              <VideoCard
                title={video.title}
                location={video.location}
                userName={video.userName}
                views={video.views}
                videoSrc={video.videoSrc}
                thumbnailSrc={video.thumbnailSrc}
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Scroll layout (TikTok-style) */}
      {layout === 'scroll' && (
        <div className="flex overflow-x-auto snap-x snap-mandatory space-x-2 pb-4 -mx-2 px-2">
          {videos.map((video, index) => (
            <div 
              key={index} 
              className="snap-start scroll-ml-2 flex-shrink-0 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <VideoCard
                title={video.title}
                location={video.location}
                userName={video.userName}
                views={video.views}
                videoSrc={video.videoSrc}
                thumbnailSrc={video.thumbnailSrc}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorePage; 