import { useContext } from "react";
import Transition from "../components/Transition";
import tw from "../utils/tailwind";
import Log from "../components/Log";
import LogsContext from "../contexts/LogsContext";

export default function MobileMenu({ isOpen, setOpen }) {
  const Logs = useContext(LogsContext);
  return (
    <Transition show={isOpen}>
      <div className={tw("md:hidden ")}>
        <div className={tw("fixed inset-0 flex z-30")}>
          <Transition
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={tw("fixed inset-0")}>
              <div
                className={tw("absolute inset-0 bg-gray-600 opacity-75")}
              ></div>
            </div>
          </Transition>
          <Transition
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveTo="translate-x-0"
            leaveFrom="-translate-x-full"
          >
            <div
              className={tw(
                "relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4",
                "bg-gray-800"
              )}
            >
              <div className={tw("absolute top-0 right-0 -mr-14 p-1")}>
                <button
                  className={tw(
                    "flex items-center justify-center h-12 w-12",
                    "rounded-full",
                    "focus:outline-none focus:bg-gray-600"
                  )}
                  aria-label="Close sidebar"
                  onClick={() => setOpen(!isOpen)}
                >
                  <svg
                    className="h-6 w-6 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-center text-white text-3xl font-bold">
                  &#x1F47B; Alert Global
                </h1>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <div className="px-2 space-y-1">
                  {Object.values(Logs).map((log) => (
                    <Log lat={log.lat} lng={log.lng} />
                  ))}
                </div>
              </div>
            </div>
          </Transition>
          <div className="flex-shrink-0 w-14">
            {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
          </div>
        </div>
      </div>
    </Transition>
  );
}
