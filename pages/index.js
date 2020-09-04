import Head from "next/head";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import mapStyle from "../components/mapStyle";
import { useState, useCallback } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};
const center = {
  lat: -33.8688,
  lng: 151.2093,
};
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: false,
};

export default function Home() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.API_TOKEN,
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [Selected, setSelected] = useState(null);

  const onMapClick = useCallback((event) => {
    setMarkers((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div className="">
      <Head>
        <title>Ghosts Global Alert</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen w-screen relative">
        <Search panTo={panTo} />

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: "/ghost.svg",
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}
          {Selected ? (
            <InfoWindow
              position={{ lat: Selected.lat, lng: Selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>Ghost Seen</h2>
                <p>{formatRelative(Selected.time, new Date())}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </main>
    </div>
  );
}

function Compass({ panTo }) {
  return (
    <button
      className="w-8 focus:outline-none"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img className="w-full" src="/compass.svg" alt="compass - find me" />
    </button>
  );
}

function Search({ panTo }) {
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
    <div className="absolute top-0 z-20 flex flex-col items-center justify-center w-full">
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
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        <Compass panTo={panTo} />
      </div>
    </div>
  );
}
