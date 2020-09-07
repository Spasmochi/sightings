import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import Compass from "../components/Compass";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import tw from "../utils/tailwind";

export default function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => -33.8688,
        lng: () => 151.2093,
      },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="flex-1 px-4 flex justify-between bg-gray-800">
      <div className="flex-1 flex">
        <Combobox
          className={tw("w-full flex md:ml-0")}
          onSelect={async (address) => {
            setValue(address, false);
            clearSuggestions();
            try {
              const results = await getGeocode({ address });
              const { lat, lng } = await getLatLng(results[0]);
              panTo({ lat, lng });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <ComboboxInput
            className={tw(
              "block w-full h-full pl-8 pr-3 py-2 rounded-md",
              "text-gray-200 placeholder-gray-200 bg-gray-800",
              "focus:outline-none focus:placeholder-gray-400",
              "sm:text-sm"
            )}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            disabled={!ready}
            placeholder="🔎 Find a location"
          />
          <ComboboxPopover className="bg-gray-800 text-white border-none">
            <ComboboxList>
              <div className="py-1">
                {status === "OK" &&
                  data.map(({ id, description }) => (
                    <ComboboxOption
                      className={tw("hover:bg-gray-900")}
                      value={description}
                    />
                  ))}
              </div>
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
      <div className={tw("ml-4 flex items-center md:ml-6")}>
        <button
          className={tw(
            "p-1 rounded-full",
            "text-gray-400",
            "focus:outline-none focus:shadow-outline focus:text-gray-500"
          )}
          aria-label="Notifications"
        >
          <Compass panTo={panTo} />
        </button>
      </div>
    </div>
  );
}
