import React from "react";

//https://larainfo.com/blogs/react-tailwind-css-dropdowns-menu-example

export default function DropdownComponent() {
    return (
        <div className="inline-flex justify-end p-4 rounded-md">
            <select
                className="px-4 py-2 pr-0 pl-8 text-gray-600 hover:text-gray-700 hover:bg-gray-50 shadow-sm appearance-none"
            >
                <option selected>MENU</option>
                <option>placeholder</option>
                <option>History</option>
                <option>Home</option>
            </select>
        </div>
    );
}

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