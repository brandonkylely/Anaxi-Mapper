import React from 'react';


const NavBar = () => {
    // const [navbar, setNavbar] = useState(false);

    // const handleNav = () => { 
    //     setNavbar(!navbar);
    // };

  return (
    <div className="flex justify-center text-xl text-stone-800 tracking-wide">
        <h1 className="flex justify-center font-serif pt-3">FIND YOUR DESTINATION</h1>
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