import tw from "../utils/tailwind";
import { useContext } from "react";
import LogsContext from "../contexts/LogsContext";

function removeLog() {}

export default function Log({ lat, lng }) {
  // const newLat = useRecoilValue(rLat);

  return (
    <div
      className={tw(
        "group relative flex items-center px-2 py-2",
        "text-sm leading-5 font-medium",
        "text-gray-300",
        "rounded-md",
        "hover:text-white hover:bg-gray-700 cursor-pointer",
        "focus:outline-none focus:text-white focus:bg-gray-700",
        "transition ease-in-out duration-150"
      )}
      //   onClick={panTo({ lat, lng })}
    >
      <svg
        className={tw(
          "mr-3 h-6 w-6",
          "text-gray-400",
          "group-hover:text-gray-300 group-focus:text-gray-300",
          "transition ease-in-out duration-150"
        )}
        focusable="false"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4s-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V2c0-.55-.45-1-1-1s-1 .45-1 1v1.06A8.994 8.994 0 0 0 3.06 11H2c-.55 0-1 .45-1 1s.45 1 1 1h1.06A8.994 8.994 0 0 0 11 20.94V22c0 .55.45 1 1 1s1-.45 1-1v-1.06A8.994 8.994 0 0 0 20.94 13H22c.55 0 1-.45 1-1s-.45-1-1-1h-1.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"
          fill="currentColor"
        ></path>
      </svg>
      <p className="pr-5">{`Ghost Sighting at lat:${lat} & lng:${lng}`}</p>
      <div
        className={tw(
          "absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start"
        )}
      >
        <button
          type="button"
          onClick={removeLog}
          className={tw(
            "flex p-1 rounded-md hover:bg-gray-500 focus:outline-none focus:bg-gray-500 transition ease-in-out duration-150"
          )}
          aria-label="Dismiss"
        >
          <svg focusable="false" width="1em" height="1em" viewBox="0 0 24 24">
            <path
              d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
