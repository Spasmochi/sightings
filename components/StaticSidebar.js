import tw from "../utils/tailwind";
export default function StaticSidebar() {
  return (
    <div className={tw("hidden md:flex md:flex-shrink-0")}>
      <div className="flex flex-col w-64">
        {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
        <div className="flex flex-col h-0 flex-1">
          <div
            className={tw(
              "flex items-center h-16 flex-shrink-0 px-4",
              "bg-gray-900"
            )}
          >
            <h1 className="text-center text-white text-3xl font-bold">
              &#x1F47B; Alert Global
            </h1>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
              <a
                href="#"
                className={tw(
                  "group flex items-center px-2 py-2",
                  "text-sm leading-5 font-medium",
                  "text-gray-300",
                  "rounded-md",
                  "hover:text-white hover:bg-gray-700",
                  "focus:outline-none focus:text-white focus:bg-gray-700",
                  "transition ease-in-out duration-150"
                )}
              >
                <svg
                  className={tw(
                    "mr-3 h-6 w-6",
                    "text-gray-400",
                    "group-hover:text-gray-300 group-focus:text-gray-300",
                    "transition ease-in-out duration-150"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Team
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
