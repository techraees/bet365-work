"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from "clsx";

const BonusesTab = () => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    if (pathname === "/admin/bonuses/bonus_prime")
      setCurrentTab("Bonus Prime");
    else if (pathname === "/admin/bonuses/bonus_system")
      setCurrentTab("Bonus System");
    else if (pathname === "/admin/bonuses/users")
      setCurrentTab("Users");
  }, [pathname])

  return (
    <>
      <p className="text-lg text-white bg-brand-title p-4">Bonuses - {currentTab}</p>
      <section className="text-sm font-medium text-center text-white bg-brand-title">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <Link
              href="/admin/bonuses/bonus_prime"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/bonuses/bonus_prime" ? "border-white border-b-4" : ""
              )}
            >
              Bonus Prime
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/bonuses/bonus_system"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/bonuses/bonus_system"
                  ? "border-white border-b-4"
                  : ""
              )}
            >
              Bonus System
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default BonusesTab;
