"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemOptions {
  name: string;
  path: string;
}
type NavigationMenu = {
  navList: NavItemOptions[];
};
export default function Navigation({ navList }: NavigationMenu) {
  const pathname = usePathname();
  return (
    <nav>
      {navList.map((navItem) => {
        return (
          <Link
            key={navItem.path}
            href={navItem.path}
            className={`block py-2.5 px-4 hover:bg-blue-700 ${
              pathname === navItem.path ? "bg-blue-700" : ""
            }`}
          >
            {navItem.name}
          </Link>
        );
      })}
    </nav>
  );
}
