import { useState, Fragment } from "react";
import { Combobox } from "@headlessui/react";
// import Select from "react-select";
import { CheckIcon } from "@heroicons/react/20/solid";

//https://headlessui.com/react/combobox

// const category = [
//   { id: 0, name: "Type a category" },
//   { id: 1, name: "Accounting" },
//   { id: 2, name: "Airport" },
//   { id: 3, name: "Amusement park" },
//   { id: 4, name: "Aquarium" },
//   { id: 5, name: "Art gallery" },
//   { id: 6, name: "ATM" },
//   { id: 7, name: "Bakery" },
//   { id: 8, name: "Bank" },
//   { id: 9, name: "Bar" },
//   { id: 10, name: "Beauty salon" },
//   { id: 11, name: "Bicycle store" },
//   { id: 12, name: "Book store" },
//   { id: 13, name: "Bowling alley" },
//   { id: 14, name: "Bus station" },
//   { id: 15, name: "Cafe" },
//   { id: 16, name: "Campground" },
//   { id: 17, name: "Car dealer" },
//   { id: 18, name: "Car rental" },
//   { id: 19, name: "Car repair" },
//   { id: 20, name: "Car wash" },
//   { id: 21, name: "Casino" },
//   { id: 22, name: "Cemetery" },
//   { id: 23, name: "Church" },
//   { id: 24, name: "City hall" },
//   { id: 25, name: "Clothing store" },
//   { id: 26, name: "Convenience store" },
//   { id: 27, name: "Courthouse" },
//   { id: 28, name: "Dentist" },
//   { id: 29, name: "Department store" },
//   { id: 30, name: "Doctor" },
//   { id: 31, name: "Drugstore" },
//   { id: 32, name: "Electrician" },
//   { id: 33, name: "Electronics store" },
//   { id: 34, name: "Embassy" },
//   { id: 35, name: "Fire Station" },
//   { id: 36, name: "Florist" },
//   { id: 37, name: "Funeral home" },
//   { id: 38, name: "Furniture store" },
//   { id: 39, name: "Gas station" },
//   { id: 40, name: "Gym" },
//   { id: 41, name: "Hair care" },
//   { id: 42, name: "Hardware store" },
//   { id: 43, name: "Hindu Temple" },
//   { id: 44, name: "Home goods store" },
//   { id: 45, name: "Hospital" },
//   { id: 46, name: "Insurance company" },
//   { id: 47, name: "Jewelry store" },
//   { id: 48, name: "Laundry" },
//   { id: 49, name: "Lawyer" },
//   { id: 50, name: "Library" },
//   { id: 51, name: "Light rail statiom" },
//   { id: 52, name: "Liquor store" },
//   { id: 53, name: "Local government office" },
//   { id: 54, name: "Locksmith" },
//   { id: 55, name: "Lodging" },
//   { id: 56, name: "Meal Delivery" },
//   { id: 57, name: "Meal takeaway" },
//   { id: 58, name: "Mosque" },
//   { id: 59, name: "Movie rental" },
//   { id: 60, name: "Movie theater" },
//   { id: 61, name: "Moving company" },
//   { id: 62, name: "Museum" },
//   { id: 63, name: "Night club" },
//   { id: 64, name: "Painter" },
//   { id: 65, name: "Park" },
//   { id: 66, name: "Parking" },
//   { id: 67, name: "Pet store" },
//   { id: 68, name: "Pharmacy" },
//   { id: 69, name: "Physiotherapist" },
//   { id: 70, name: "Plumber" },
//   { id: 71, name: "Police" },
//   { id: 72, name: "Post office" },
//   { id: 73, name: "Primary school" },
//   { id: 74, name: "Real estate agency" },
//   { id: 75, name: "Restaurant" },
//   { id: 76, name: "Roofing contractor" },
//   { id: 77, name: "RV park" },
//   { id: 78, name: "School" },
//   { id: 79, name: "Secondary school" },
//   { id: 80, name: "Shoe store" },
//   { id: 81, name: "Shopping mall" },
//   { id: 82, name: "Spa" },
//   { id: 83, name: "Stadium" },
//   { id: 84, name: "Storage" },
//   { id: 85, name: "Store" },
//   { id: 86, name: "Subway station" },
//   { id: 87, name: "Supermarket" },
//   { id: 88, name: "Synagogue" },
//   { id: 89, name: "Taxi stand" },
//   { id: 90, name: "Train station" },
//   { id: 91, name: "Transit station" },
//   { id: 92, name: "Travel agency" },
//   { id: 93, name: "University" },
//   { id: 94, name: "Veterinary care" },
//   { id: 95, name: "Zoo" },
// ];

function MyCombobox({
  setQuery,
  selectedCategory,
  setSelectedCategory,
  filteredCategory,
}) {
  //   const [selectedCategory, setSelectedCategory] = useState(category[0]);
  //   const [query, setQuery] = useState("");

  //   const filteredCategory =
  //     query === ""
  //       ? category
  //       : category.filter((oneCategory) => {
  //           return oneCategory.name.toLowerCase().includes(query.toLowerCase());
  //         });

  //   console.log(selectedCategory);
  //   console.log(query);
  // const handlechange = (event) => {
  //   console.log("In the handlechange function");
  //   console.log(event.target.value);
  //   setQuery(event.target.value);
  // }

  return (
    <Combobox value={selectedCategory} onChange={setSelectedCategory} multiple>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        // @ts-ignore
        displayValue={(oneCategory) => oneCategory.name}
      />
      <Combobox.Options>
        {filteredCategory.map((oneCategory) => (
          /* Use the `active` state to conditionally style the active option. */
          /* Use the `selected` state to conditionally style the selected option. */
          // @ts-ignore
          <Combobox.Option
            className="text-sm font-medium text-gray-500"
            key={oneCategory.id}
            value={oneCategory}
            as={Fragment}
          >
            {({ active, selected }) => (
              <li
                className={`${active ? "bg-indigo-600 text-white" : "bg-white text-black"}`}
              >
                <div className="flex gap-2">
                  <div>{oneCategory.name}</div>
                  {selected && <CheckIcon className="w-4 h-4" />}
                </div>
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
// @ts-ignore
export default MyCombobox;
