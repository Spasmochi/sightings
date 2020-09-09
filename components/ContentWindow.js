import tw from "../utils/tailwind";
import Search from "./Search";

export default function ContentWindow({ children, panTo, isOpen, setOpen }) {
  return (
    <div className="h-full w-full flex flex-col w-0 flex-1 overflow-hidden">
      <div className="relative z-10 flex-shrink-0 flex h-16 bg-gray-800 shadow">
        <button
          className={tw(
            "px-4",
            "text-gray-200 bg-gray-800",
            "focus:outline-none focus:bg-gray-900 focus:text-gray-300",
            "md:hidden"
          )}
          aria-label="Open sidebar"
          onClick={() => setOpen(!isOpen)}
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
