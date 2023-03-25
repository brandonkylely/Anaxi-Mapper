import React from "react";
import Typewriter from "typewriter-effect";

const Catchphrase = () => {
  return (
    <div className='pl-4 pt-2 text-5xl col-span-4 flex font-delicious-handrawn tracking-wide'>
      <p className=' '>
        find your new
      </p>
      <div className='pl-2 text-lime-700'>
        <Typewriter options= {{
          strings: ['vacation', 'home', 'activity', 'destination'],
          autoStart: true,
          loop: true,
          delay: 75
         }}/>
      </div>
    </div>
  );
};

export default Catchphrase;
