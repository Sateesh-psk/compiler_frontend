import React from 'react';

const slides = [
  { 
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D', 
    title: 'Write with Precision', 
    description: 'Write clean and efficient code with ease.'
  },
  { 
    image: 'https://plus.unsplash.com/premium_photo-1664297989345-f4ff2063b212?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VydmVyfGVufDB8fDB8fHww', 
    title: 'Run It Instantly', 
    description: 'Execute your code immediately with live preview.'
  },
  { 
    image: 'https://static9.depositphotos.com/1152339/1160/i/450/depositphotos_11605764-stock-photo-security-concept-lock-on-digital.jpg', 
    title: 'Save. Sync. Secure.', 
    description: 'Keep your work safe and in sync across devices.'
  }
]; 

const Carousel = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="flex h-full animate-slide-carousel">
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={`carousel-${index}`}
              className="w-full h-full opacity-60 object-cover"
            />
            {/* Title and Description */}
            <div className="absolute bottom-10 left-30 text-white p-4 rounded-lg text-center">
              <h2 className="text-2xl font-semibold">{slide.title}</h2>
              <p className="text-sm mt-2">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
