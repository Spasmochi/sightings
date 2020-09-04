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
    <div className="absolute top-0 z-20 flex flex-col items-center justify-center w-full font-sans pt-2 font-sans">
      <h1 className="text-center text-white text-3xl font-bold">
        &#x1F47B; Alert Global
      </h1>
      <div className="flex flex-row space-between justify-center items-center  mt-2">
        <Combobox
          className="mr-5"
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
            className="p-1 form-input"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            disabled={!ready}
            placeholder="Find a location"
          />
          <ComboboxPopover className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
            <ComboboxList className="rounded-md bg-white shadow-xs">
              <div className="py-1">
                {status === "OK" &&
                  data.map(({ id, description }) => (
                    <ComboboxOption
                      value={description}
                      className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer"
                    />
                  ))}
              </div>
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        <Compass panTo={panTo} />
      </div>
    </div>
  );
}
