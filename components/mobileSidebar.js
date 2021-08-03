import { Transition } from "@headlessui/react";

const MobileSidebar = ({ isOpen }) => {
  return (
    <div className="z-40">
      <Transition
        show={isOpen}
        enterTo=""
        enterFrom=""
        enter=""
        leave=""
        leaveTo=""
      ></Transition>

      <Transition
        show={isOpen}
        enterTo=""
        enterFrom=""
        enter=""
        leave=""
        leaveTo=""
      ></Transition>
    </div>
  );
};

export default MobileSidebar;
