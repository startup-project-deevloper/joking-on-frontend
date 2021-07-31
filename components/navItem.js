import { useState } from "react";

import Image from "next/image";

export default function NavItem({ handleChange, children, type }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="flex items-center justify-items-end">
      <a
        href="#"
        className={`bg-gray-700 rounded-3xl flex p-1 m-1 items-center justify-items-center filter brightness-125 h-8 w-8`}
        onClick={() => setIsOpen(!isOpen) && handleChange()}
      >
        <Image src={type.value} alt={type.key} width={24} height={24} />

        {isOpen && children}
      </a>
    </li>
  );
}
