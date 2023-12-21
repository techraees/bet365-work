"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from "clsx";

const DelayTab = () => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    if (pathname === "/admin/delay/settings")
      setCurrentTab("Settings");
    else if (pathname === "/admin/delay/users")
      setCurrentTab("Users");
  }, [pathname])

  return (
    <>
      <p className="text-lg text-white bg-brand-title p-4">Delay - {currentTab}</p>
      <section className="text-sm font-medium text-center text-white bg-brand-title">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <Link
              href="/admin/delay/settings"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/delay/settings" ? "border-white border-b-4" : ""
              )}
            >
              Settings
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/delay/users"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/delay/users"
                  ? "border-white border-b-4"
                  : ""
              )}
            >
              Users
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default DelayTab;
