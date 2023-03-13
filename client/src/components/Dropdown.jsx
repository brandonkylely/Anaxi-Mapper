import React from "react";

//https://larainfo.com/blogs/react-tailwind-css-dropdowns-menu-example
//https://stackoverflow.com/questions/70673541/link-options-on-select-with-react

//FIGURE OUT HOW TO MOVE IT TO RIGHT SIDE OF SCREEN !

export default function DropdownComponent() {
    return (
        <div className="inline-flex justify-end p-4 rounded-md">
            <select
                className="px-4 py-2 pr-0 pl-4 text-gray-600 hover:text-gray-700 hover:bg-gray-50 shadow-sm appearance-none"
            >
                <option selected>MENU</option>
                <option value="favorites"><a href="#">Favorites</a></option>
                <option value="history"><a href="#">History</a></option>
                <option value="home"><a href="#">Home</a></option>
            </select>
        </div>
    );
}

//reference to be able to make the options to links that actually go somewhere

{/* <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
     >
        ReactJS Dropdown 1
    </a>
    <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
    >
        ReactJS Dropdown 2
    </a>
    <a
        href="#"
        className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
    >
        ReactJS Dropdown 3
    </a> 
*/}