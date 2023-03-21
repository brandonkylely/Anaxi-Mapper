import { useState, Fragment } from "react";
import { Combobox } from "@headlessui/react";
// import Select from "react-select";
import { CheckIcon } from "@heroicons/react/20/solid";


function MyCombobox({
  setQuery,
  selectedCategory,
  setSelectedCategory,
  filteredCategory,
}) {

  return (
    <Combobox value={selectedCategory} onChange={setSelectedCategory} multiple>
      <Combobox.Input
        className="w-small py-1 pl-3 pr-2 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
        onChange={(event) => setQuery(event.target.value)}
        // @ts-ignore
        displayValue={(oneCategory) => oneCategory.name}
        type="text"
        placeholder="category options"
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
                className={`${
                  active ? "bg-indigo-600 text-white" : "bg-white text-black"
                }`}
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
