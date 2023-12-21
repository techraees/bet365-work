"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from "clsx";

const PaymentsTab = () => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    if (pathname === "/admin/payments/deposits")
      setCurrentTab("Deposits");
    else if (pathname === "/admin/payments/methods")
      setCurrentTab("Methods");
  }, [pathname])

  return (
    <>
      <p className="text-lg text-white bg-brand-title p-4">Payments - {currentTab}</p>
      <section className="text-sm font-medium text-center text-white bg-brand-title">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <Link
              href="/admin/payments/deposits"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/payments/deposits" ? "border-white border-b-4" : ""
              )}
            >
              Deposits
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/payments/methods"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/payments/methods"
                  ? "border-white border-b-4"
                  : ""
              )}
            >
              Methods
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default PaymentsTab;
