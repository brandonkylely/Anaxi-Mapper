import React from 'react';
import Typewriter from 'typewriter-effect';

//https://reactjsexample.com/a-react-component-for-adding-a-nice-typewriter-effect/
//https://www.npmjs.com/package/typewriter-effect - all the way at the bottom


const NavBar = () => {
  return (
    <div className='flex justify-center font-medium font-mono tracking-wide'>
      <p className='md:text-2xl p-2 '>
        FIND YOUR NEW
      </p>
      <p className='md:text-2xl p-2 pl-1 text-lime-700'>
        <Typewriter options= {{
          strings: ['VACATION', 'HOME', 'ACTIVITY', 'DESTINATION'],
          autoStart: true,
          loop: true,
          delay: 75
         }}/>
      </p>
    </div>
    
  );

};

export default NavBar;