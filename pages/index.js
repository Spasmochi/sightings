import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import mapStyle from "./mapStyle";

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
  zoomControl: true,
};

export default function Home() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.API_TOKEN,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Ghosts &#x1F47B;</h1>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={center}
          options={options}
        ></GoogleMap>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/Spasmochi"
          target="_blank"
          rel="noopener noreferrer"
        >
          A Spasmochi Creation{" "}
        </a>
      </footer>
    </div>
  );
}
