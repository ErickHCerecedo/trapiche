import React from 'react';

const page: React.FC = () => {
    return (
        <div className=" py-0 md:pt-16 flex flex-col items-center">
           <iframe 
                src="https://player.flipsnack.com?hash=OTY5RDk2OTlFOEMrdGllcmkzOXh1Mw=="  
                className='w-full h-screen pd:h-[66rem]'
                allowFullScreen 
                allow="autoplay; clipboard-read; clipboard-write"
            ></iframe>
        </div>
  )
}

export default page