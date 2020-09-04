import { useState } from "react";
import tw from "../utils/tailwind";
import { Transition } from "@tailwindui/react";
import MobileMenu from "./MobileMenu";
import StaticSidebar from "./StaticSidebar";
import ContentWindow from "./ContentWindow";

export default function Shell({ children, panTo }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className={tw("flex h-full w-full", "overflow-hidden", "bg-gray-800")}>
      {/* <!-- Off-canvas menu for mobile --> */}
      <div className={tw("md:hidden")}>
        <div className={tw("fixed inset-0 flex")}>
          <Transition
            show={isOpen}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={tw("fixed inset-0")}>
              <div
                className={tw("absolute inset-0 bg-gray-600 opacity-75")}
              ></div>
            </div>

            <MobileMenu />
            <div className="flex-shrink-0 w-14">
              {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
            </div>
          </Transition>
        </div>
      </div>
      {/* <!-- Static sidebar for desktop --> */}
      <StaticSidebar />
      <ContentWindow panTo={panTo}>{children}</ContentWindow>
    </div>
  );
}
