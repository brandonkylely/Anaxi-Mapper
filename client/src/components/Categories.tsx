import { useState, Fragment } from 'react'
import { Combobox } from '@headlessui/react'
// import { CheckIcon } from '@heroicons/react/20/solid'

//https://headlessui.com/react/combobox

const category = [
  { id: 0, name: 'Type a category' },
  { id: 1, name: 'Accounting' },
  { id: 2, name: 'Airport' },
  { id: 3, name: 'Amusement park' },
  { id: 4, name: 'Aquarium' },
  { id: 5, name: 'Art gallery' },
  { id: 6, name: 'ATM' },
  { id: 7, name: 'Bakery' },
  { id: 8, name: 'Bank' },
  { id: 9, name: 'Bar' },
  { id: 10, name: 'Beauty salon' },
  { id: 11, name: 'Bicycle store' },
  { id: 12, name: 'Book store' },
  { id: 13, name: 'Bowling alley' },
  { id: 14, name: 'Bus station' },
  { id: 15, name: 'Cafe' },
  { id: 16, name: 'Campground' },
  { id: 17, name: 'Car dealer' },
  { id: 18, name: 'Car rental' },
  { id: 19, name: 'Car repair' },
  { id: 20, name: 'Car wash' },
  { id: 21, name: 'Casino' },
  { id: 22, name: 'Cemetery' },
  { id: 23, name: 'Church' },
  { id: 24, name: 'City hall' },
  { id: 25, name: 'Clothing store' },
  { id: 26, name: 'Convenience store' },
  { id: 27, name: 'Courthouse' },
  { id: 28, name: 'Dentist' },
  { id: 29, name: 'Department store' },
  { id: 30, name: 'Doctor' },
  { id: 31, name: 'Drugstore' },
  { id: 32, name: 'Electrician' },
  { id: 33, name: 'Electronics store' },
  { id: 34, name: 'Embassy' },
  { id: 35, name: 'Fire Station' },
  { id: 36, name: 'Florist' },
  { id: 37, name: 'Funeral home' },
  { id: 38, name: 'Furniture store' },
  { id: 39, name: 'Gas station' },
  { id: 40, name: 'Gym' },
  { id: 41, name: 'Hair care' },
  { id: 42, name: 'Hardware store' },
  { id: 43, name: 'Hindu Temple' },
  { id: 44, name: 'Home goods store' },
  { id: 45, name: 'Hospital' },
  { id: 46, name: 'Insurance company' },
  { id: 47, name: 'Jewelry store' },
  { id: 48, name: 'Laundry' },
  { id: 49, name: 'Lawyer' },
  { id: 50, name: 'Library' },
  { id: 51, name: 'Light rail statiom' },
  { id: 52, name: 'Liquor store' },
  { id: 53, name: 'Local government office' },
  { id: 54, name: 'Locksmith' },
  { id: 55, name: 'Lodging' },
  { id: 56, name: 'Meal Delivery' },
  { id: 57, name: 'Meal takeaway' },
  { id: 58, name: 'Mosque' },
  { id: 59, name: 'Movie rental' },
  { id: 60, name: 'Movie theater' },
  { id: 61, name: 'Moving company' },
  { id: 62, name: 'Museum' },
  { id: 63, name: 'Night club' },
  { id: 64, name: 'Painter' },
  { id: 65, name: 'Park' },
  { id: 66, name: 'Parking' },
  { id: 67, name: 'Pet store' },
  { id: 68, name: 'Pharmacy' },
  { id: 69, name: 'Physiotherapist' },
  { id: 70, name: 'Plumber' },
  { id: 71, name: 'Police' },
  { id: 72, name: 'Post office' },
  { id: 73, name: 'Primary school' },
  { id: 74, name: 'Real estate agency' },
  { id: 75, name: 'Restaurant' },
  { id: 76, name: 'Roofing contractor' },
  { id: 77, name: 'RV park' },
  { id: 78, name: 'School' },
  { id: 79, name: 'Secondary school' },
  { id: 80, name: 'Shoe store' },
  { id: 81, name: 'Shopping mall' },
  { id: 82, name: 'Spa' },
  { id: 83, name: 'Stadium' },
  { id: 84, name: 'Storage' },
  { id: 85, name: 'Store' },
  { id: 86, name: 'Subway station' },
  { id: 87, name: 'Supermarket' },
  { id: 88, name: 'Synagogue' },
  { id: 89, name: 'Taxi stand' },
  { id: 90, name: 'Train station' },
  { id: 91, name: 'Transit station' },
  { id: 92, name: 'Travel agency' },
  { id: 93, name: 'University' },
  { id: 94, name: 'Veterinary care' },
  { id: 95, name: 'Zoo' }

]

function MyCombobox() {
  const [selectedCategory, setSelectedCategory] = useState(category[0])
  const [query, setQuery] = useState('')

  const filteredCategory =
    query === ''
      ? category
      : category.filter((oneCategory) => {
          return oneCategory.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedCategory} onChange={setSelectedCategory}>
      <div className="relative inline-block float-left p-2 pr-8 ml-4 mt-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-grey-100">
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(oneCategory) => oneCategory.name}
      />
      <Combobox.Options>
        {filteredCategory.map((oneCategory) => (
          /* Use the `active` state to conditionally style the active option. */
          /* Use the `selected` state to conditionally style the selected option. */
          <Combobox.Option key={oneCategory.id} value={oneCategory} as={Fragment}>
            {({ active, selected }) => (
              <li
                className={`${
                  active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
              >
                {selected}
                {oneCategory.name}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
      </div>
    </Combobox>
  );
};

export default MyCombobox;


// import { Fragment } from "react";
// import { Menu, Transition } from "@headlessui/react";

//https://larainfo.com/blogs/react-tailwind-css-dropdowns-menu-example

// function classNames(...classes) {
//     return classes.filter(Boolean).join(" ");
// }

// accounting
// airport
// amusement_park
// aquarium
// art_gallery
// atm
// bakery
// bank
// bar
// beauty_salon
// bicycle_store
// book_store
// bowling_alley
// bus_station
// cafe
// campground
// car_dealer
// car_rental
// car_repair
// car_wash
// casino
// cemetery
// church
// city_hall
// clothing_store
// convenience_store
// courthouse
// dentist
// department_store
// doctor
// drugstore
// electrician
// electronics_store
// embassy
// fire_station
// florist
// funeral_home
// furniture_store
// gas_station
// gym
// hair_care
// hardware_store
// hindu_temple
// home_goods_store
// hospital
// insurance_agency
// jewelry_store
// laundry
// lawyer
// library
// light_rail_station
// liquor_store
// local_government_office
// locksmith
// lodging
// meal_delivery
// meal_takeaway
// mosque
// movie_rental
// movie_theater
// moving_company
// museum
// night_club
// painter
// park
// parking
// pet_store
// pharmacy
// physiotherapist
// plumber
// police
// post_office
// primary_school
// real_estate_agency
// restaurant
// roofing_contractor
// rv_park
// school
// secondary_school
// shoe_store
// shopping_mall
// spa
// stadium
// storage
// store
// subway_station
// supermarket
// synagogue
// taxi_stand
// tourist_attraction
// train_station
// transit_station
// travel_agency
// university
// veterinary_care
// zoo



// export default function Categories() {
//     return (
//         <Menu as="div" className="relative inline-block float-left p-2 pl-4 mb-10 pt-3">
//             <div>
//                 <Menu.Button className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-grey-100">
//                     categories
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="w-5 h-5 ml-2 -mr-1"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                     >
//                         <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M19 9l-7 7-7-7"
//                         />
//                     </svg>
//                 </Menu.Button>
//             </div>

//             <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//             >
//                 <Menu.Items className="absolute right w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <div className="py-1">
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Accounting
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Airport
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Amusement Park
//                                 </a>
//                             )}
//                         </Menu.Item>
//                             <Menu.Item>
//                                 {({ active }) => (
//                                     <button
//                                         type="submit"
//                                         className={classNames(
//                                             active
//                                                 ? "bg-gray-100 text-gray-900"
//                                                 : "text-gray-700",
//                                             "block w-full text-left px-4 py-2 text-sm"
//                                         )}
//                                     >
//                                         Aquarium
//                                     </button>
//                                 )}
//                             </Menu.Item>
//                             <Menu.Item>
//                                 {({ active }) => (
//                                     <button
//                                         type="submit"
//                                         className={classNames(
//                                             active
//                                                 ? "bg-gray-100 text-gray-900"
//                                                 : "text-gray-700",
//                                             "block w-full text-left px-4 py-2 text-sm"
//                                         )}
//                                     >
//                                         Art Gallery
//                                     </button>
//                                 )}
//                             </Menu.Item>
//                             <Menu.Item>
//                                 {({ active }) => (
//                                     <button
//                                         type="submit"
//                                         className={classNames(
//                                             active
//                                                 ? "bg-gray-100 text-gray-900"
//                                                 : "text-gray-700",
//                                             "block w-full text-left px-4 py-2 text-sm"
//                                         )}
//                                     >
//                                         Art Gallergy
//                                     </button>
//                                 )}
//                             </Menu.Item>
//                             <Menu.Item>
//                                 {({ active }) => (
//                                     <button
//                                         type="submit"
//                                         className={classNames(
//                                             active
//                                                 ? "bg-gray-100 text-gray-900"
//                                                 : "text-gray-700",
//                                             "block w-full text-left px-4 py-2 text-sm"
//                                         )}
//                                     >
//                                         Bakery
//                                     </button>
//                                 )}
//                             </Menu.Item>
//                             <Menu.Item>
//                                 {({ active }) => (
//                                     <button
//                                         type="submit"
//                                         className={classNames(
//                                             active
//                                                 ? "bg-gray-100 text-gray-900"
//                                                 : "text-gray-700",
//                                             "block w-full text-left px-4 py-2 text-sm"
//                                         )}
//                                     >
//                                         Bank
//                                     </button>
//                                 )}
//                             </Menu.Item>
//                             <Menu.Item>
//                                 {({ active }) => (
//                                     <button
//                                         type="submit"
//                                         className={classNames(
//                                             active
//                                                 ? "bg-gray-100 text-gray-900"
//                                                 : "text-gray-700",
//                                             "block w-full text-left px-4 py-2 text-sm"
//                                         )}
//                                     >
//                                         Bar
//                                     </button>
//                                 )}
//                             </Menu.Item>
//                             <Menu.Item>
//                                 {({ active }) => (
//                                     <button
//                                         type="submit"
//                                         className={classNames(
//                                             active
//                                                 ? "bg-gray-100 text-gray-900"
//                                                 : "text-gray-700",
//                                             "block w-full text-left px-4 py-2 text-sm"
//                                         )}
//                                     >
//                                         Beauty Salon
//                                     </button>
//                                 )}
//                             </Menu.Item>
//                             <Menu.Item>
//                                 {({ active }) => (
//                                     <button
//                                         type="submit"
//                                         className={classNames(
//                                             active
//                                                 ? "bg-gray-100 text-gray-900"
//                                                 : "text-gray-700",
//                                             "block w-full text-left px-4 py-2 text-sm"
//                                         )}
//                                     >
//                                         Bicycle Store
//                                     </button>
//                                 )}
//                             </Menu.Item>
//                             <Menu.Item>
//                                 {({ active }) => (
//                                     <button
//                                         type="submit"
//                                         className={classNames(
//                                             active
//                                                 ? "bg-gray-100 text-gray-900"
//                                                 : "text-gray-700",
//                                             "block w-full text-left px-4 py-2 text-sm"
//                                         )}
//                                     >
//                                         Book Store
//                                     </button>
//                                 )}
//                             </Menu.Item>
//                             <Menu.Item>
//                                 {({ active }) => (
//                                     <button
//                                         type="submit"
//                                         className={classNames(
//                                             active
//                                                 ? "bg-gray-100 text-gray-900"
//                                                 : "text-gray-700",
//                                             "block w-full text-left px-4 py-2 text-sm"
//                                         )}
//                                     >
//                                         Bowling Alley
//                                     </button>
//                                 )}
//                             </Menu.Item>
//                             <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Bus station
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Cafe
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Campground
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Car dealer
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Car rental
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Car repair
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Car wash
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Casino
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Cemetery
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Church
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     City Hall
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Clothing store
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Convenience store
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Courthouse
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Dentist
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Department store
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Doctor
//                                 </a>
//                             )}
//                         </Menu.Item>
//                         <Menu.Item>
//                             {({ active }) => (
//                                 <a
//                                     href="#"
//                                     className={classNames(
//                                         active
//                                             ? "bg-gray-100 text-gray-900"
//                                             : "text-gray-700",
//                                         "block px-4 py-2 text-sm"
//                                     )}
//                                 >
//                                     Drug store
//                                 </a>
//                             )}
//                         </Menu.Item>
                        
//                     </div>
//                 </Menu.Items>
//             </Transition>
//         </Menu>
//     );
// }
