import { useState } from "react";

import Image from "next/image";

export default function NavItem({ handleChange, children, type }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li className="flex items-center justify-items-end">
        <a
          href="#"
          className="flex items-center p-1 m-1 bg-gray-700 rounded-3xl justify-items-center filter brightness-125"
          onClick={() => setIsOpen(!isOpen) && handleChange()}
        >
          <Image src={type.value} alt={type.key} width={24} height={24} />
        </a>
      </li>
      {isOpen && children}
    </>
  );
}
