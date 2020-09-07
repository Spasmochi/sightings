export default function Compass({ panTo }) {
  return (
    <div
      className="w-8 focus:outline-none cursor-pointer"
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
    </div>
  );
}
