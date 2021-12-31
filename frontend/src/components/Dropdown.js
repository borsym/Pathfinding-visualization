import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import "../functions/Names.js";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const names = {
  Speed: {
    10: "Fast",
    50: "Normal",
    100: "Slow",
  },
  Algorithms: {
    BFS: "BFS",
    DFS: "DFS",
    Dijkstra: "Dijkstra",
    Astar: "A*",
  },
  Type: {
    10: "Dirt",
    20: "Water",
    30: "Stone",
  },
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

const Dropdown = (props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-full bg-gray-800 font-bold text-white hover:text-emerald-500 hover:bg-gray-700 py-2 px-4">
          {props.name}
          {props.name === "Speed"
            ? `: ${names.Speed[props.speed]}`
            : // : props.name === "Type"
              // ? `: ${names.Type[props.type]}`
              ""}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-150"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-5 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {props.options.map((option) => (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      if (props.name === "Speed") {
                        props.setVariable(
                          getKeyByValue(names[props.name], option)
                        );
                      } else {
                        props.setVariable(option);
                      }
                    }}
                    className={classNames(
                      active ? "text-blue-500 " : "text-white",
                      "block px-4 py-2 text-sm hover:text-emerald-500"
                    )}
                  >
                    {option}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default Dropdown;
