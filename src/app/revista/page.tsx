import React from 'react';

const page: React.FC = () => {
    return (
        <div className="p-0 flex flex-col items-center bg-black">
           <iframe
                src="https://player.flipsnack.com?hash=OTY5RDk2OTlFOEMrZHBsNzhhMDk1ZQ=="  
                className='w-full h-[93vh] md:h-screen p-0 m-0 bg-black !important'
                style={{ backgroundColor: '#0f172a !important'}}
                allowFullScreen 
                allow="autoplay; clipboard-read; clipboard-write"
            ></iframe>
        </div>
  )
}

export default page