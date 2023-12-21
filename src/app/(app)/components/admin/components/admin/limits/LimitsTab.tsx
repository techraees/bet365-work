"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from "clsx";

const LimitsTab = () => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    if (pathname === "/admin/limits/settings")
      setCurrentTab("Settings");
    else if (pathname === "/admin/limits/general")
      setCurrentTab("General");
    else if (pathname === "/admin/limits/sort_groups")
      setCurrentTab("Sort Groups");
    else if (pathname === "/admin/limits/users")
      setCurrentTab("Users");
  }, [pathname])

  return (
    <>
      <p className="text-lg text-white bg-brand-title p-4">Limits - {currentTab}</p>
      <section className="text-sm font-medium text-center text-white bg-brand-title">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <Link
              href="/admin/limits/settings"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/limits/settings" ? "border-white border-b-4" : ""
              )}
            >
              Settings
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/limits/general"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/limits/general"
                  ? "border-white border-b-4"
                  : ""
              )}
            >
              General
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/limits/sort_groups"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/limits/sort_groups" ? "border-white border-b-4" : ""
              )}
            >
              Sort Groups
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/limits/users"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/limits/users" ? "border-white border-b-4" : ""
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

export default LimitsTab;
