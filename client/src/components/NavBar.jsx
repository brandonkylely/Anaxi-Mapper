import React from 'react';
import Typewriter from 'typewriter-effect';


const NavBar = () => {
    // const [navbar, setNavbar] = useState(false);

    // const handleNav = () => { 
    //     setNavbar(!navbar);
    // };

  return (
    <div className='flex justify-center font-medium font-mono tracking-wide'>
      <p className='md:text-2xl p-2 '>FIND YOUR NEW</p>
      <p className='md:text-2xl p-2 pl-1 text-lime-700'>
        <Typewriter options= {{
          strings: ['VACATION', 'HOME', 'ACTIVITY', 'DESTINATION'],
          autoStart: true,
          loop: true,
          delay: 75
         }}/>
      </p>
    </div>
    
    // <div className=" font-bolder text-xl justify-items-end tracking-wide text-xl">
       
    //   <ul className="md:flex pt-3.5 pb-5">
    //     <a onClick={handleNav} href="#home">
    //       <li className="p-7">HOME</li>
    //     </a>
    //     <a onClick={handleNav} href="#login">
    //       <li className="p-7">LOGIN </li>
    //     </a>
    //   </ul> 
        
    // </div>
  );

};

export default NavBar;