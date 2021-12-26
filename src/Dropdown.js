/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown(props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-full bg-gray-800 font-bold text-white hover:text-emerald-500 hover:bg-gray-700 py-2 px-4">
          {props.name}
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
                    href="/#"
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
}
