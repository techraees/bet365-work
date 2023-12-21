"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from "clsx";

const ReportsTab = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const username = searchParams?.get('username');
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    if (pathname === "/admin/reports/bets_list")
      setCurrentTab("Bets List");
    else if (pathname === "/admin/reports/financial_report")
      setCurrentTab("Financial Report");
    else if (pathname === "/admin/reports/slots")
      setCurrentTab("Games");
    else if (pathname === "/admin/reports/casino")
      setCurrentTab("Casino");
    else if (pathname === "/admin/reports/transactions")
      setCurrentTab("Transactions");
    else if (pathname === "/admin/reports/deposit")
      setCurrentTab("Deposit Report");
  }, [pathname])

  return (
    <>
      <p className="text-lg text-white bg-brand-title p-4">Reports - {currentTab}{username !== null ? " - " + username : ""}</p>
      <section className="text-sm font-medium text-center text-white bg-brand-title">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <Link
              href="/admin/reports/bets_list"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/reports/bets_list" ? "border-white border-b-4" : ""
              )}
            >
              Bets List
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/reports/financial_report"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/reports/financial_report"
                  ? "border-white border-b-4"
                  : ""
              )}
            >
              Financial Report
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/reports/slots"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/reports/slots" ? "border-white border-b-4" : ""
              )}
            >
              Slots
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/reports/casino"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/reports/casino" ? "border-white border-b-4" : ""
              )}
            >
              Casino
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/reports/transactions"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/reports/transactions" ? "border-white border-b-4" : ""
              )}
            >
              Transactions
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/reports/deposit"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/reports/deposit" ? "border-white border-b-4" : ""
              )}
            >
              Deposit
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default ReportsTab;
