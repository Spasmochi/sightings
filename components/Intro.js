import { useSpring, animated } from "react-spring";

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
const trans2 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;

export function Intro() {
    const [props, set] = useSpring(() => ({
        xy: [0, 0],
        config: { mass: 10, tension: 550, friction: 140 },
    }));
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-opacity-0 absolute z-50" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
            <div className=" h-36 mt-12 text-center rounded-md bg-gray-800 p-5">
                <h1 className="bg-clip-text text-transparent text-4xl bg-gradient-to-r from-white to-gray-400 tracking-tight leading-8 font-extrabold sm:text-5xl sm:leading-none md:text-6xl">Welcome to Ghosts Alert Global!</h1>
                <p className="mt-1 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    click anywhere on the map to track your ghostly sightings
                </p>
            </div>
            <div className="w-full h-full flex items-center justify-center bg-opacity-0">
                <animated.div
                    className="card1"
                    style={{ transform: props.xy.interpolate(trans1) }}
                />
                <animated.div
                    className="card2"
                    style={{ transform: props.xy.interpolate(trans2) }}
                />
            </div>
        </div>
    );
}
