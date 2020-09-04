import tw from "../utils/tailwind";
import Search from "./Search";

export default function ContentWindow({ children, panTo }) {
  return (
    <div className="h-full w-full flex flex-col w-0 flex-1 overflow-hidden">
      <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          className={tw(
            "px-4",
            "border-r border-gray-200",
            "text-gray-500",
            "focus:outline-none focus:bg-gray-100 focus:text-gray-600",
            "md:hidden"
          )}
          aria-label="Open sidebar"
        >
          <svg
            className="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </button>
        <Search panTo={panTo} />
      </div>

      <main
        className={tw("flex-1 relative overflow-y-auto focus:outline-none")}
        tabIndex="0"
      >
        <div className={tw("h-full w-full mx-auto")}>{children}</div>
      </main>
    </div>
  );
}
