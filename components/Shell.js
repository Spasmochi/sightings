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
      <MobileMenu isOpen={isOpen} setOpen={setOpen} />
      <StaticSidebar panTo={panTo} />
      <ContentWindow panTo={panTo} isOpen={isOpen} setOpen={setOpen}>
        {children}
      </ContentWindow>
    </div>
  );
}
