import React from "react";
// import History from "../pages/History";

//https://larainfo.com/blogs/react-tailwind-css-dropdowns-menu-example
//https://stackoverflow.com/questions/70673541/link-options-on-select-with-react

//FIGURE OUT HOW TO MOVE IT TO RIGHT SIDE OF SCREEN !
//get the buttons to actually work.. 
//^ ex. 
    //const NavBar = () => {
    // const [navbar, setNavbar] = useState(false);

    // const handleNav = () => { 
    //     setNavbar(!navbar);
    // };

export default function Dropdown() {
    return (
        <div className="col-start-12 pr-4 rounded-md ">
            <select
                className="font-bold text-center py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 shadow-sm appearance-none"
            >
                <option selected >MENU</option>
                <option value="history"><a href="#">Home</a></option>
                <option value="favorites"><a href="#">Favorites</a></option>
                <option value="logout"><a href="#">Logout</a></option>
            </select>
        </div>
    );
}
