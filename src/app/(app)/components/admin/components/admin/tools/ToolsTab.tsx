"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from "clsx";

const ToolsTab = () => {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    if (pathname === "/admin/tools/user_search")
      setCurrentTab("Users");
    else if (pathname === "/admin/tools/coupons")
      setCurrentTab("Coupons");
    else if (pathname === "/admin/tools/search_coupon")
      setCurrentTab("Search Coupon");
    else if (pathname === "/admin/tools/slot_transactions")
      setCurrentTab("Slots");
    else if (pathname === "/admin/tools/casino_transactions")
      setCurrentTab("Casino");
    else if (pathname === "/admin/tools/bet_types")
      setCurrentTab("Bet Types");
    else if (pathname === "/admin/tools/league")
      setCurrentTab("League");
    else if (pathname === "/admin/tools/sports")
      setCurrentTab("Sports");
    else if (pathname === "/admin/tools/locations")
      setCurrentTab("Locations");
    else if (pathname === "/admin/tools/users_online")
      setCurrentTab("Users Online");
    else if (pathname === "/admin/tools/countries")
      setCurrentTab("Countries");
    else if (pathname === "/admin/tools/country_groups")
      setCurrentTab("Country Groups");
    else if (pathname === "/admin/tools/exclude_events")
      setCurrentTab("Exclude Events");
    else if (pathname === "/admin/tools/event_statistics")
      setCurrentTab("Event Statistics");
    else if (pathname === "/admin/tools/logs")
      setCurrentTab("Logs");
    else if (pathname === "/admin/tools/margins")
      setCurrentTab("Margins");
  }, [pathname])

  return (
    <>
      <p className="text-lg text-white bg-brand-title p-4">Tools - {currentTab}</p>
      <section className="text-sm font-medium text-center text-white bg-brand-title">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <Link
              href="/admin/tools/user_search"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/user_search" ? "border-white border-b-4" : ""
              )}
            >
              User Search
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/coupons"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/coupons"
                  ? "border-white border-b-4"
                  : ""
              )}
            >
              Coupons
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/search_coupon"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/search_coupon" ? "border-white border-b-4" : ""
              )}
            >
              Search Coupon
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/slot_transactions"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/slot_transactions" ? "border-white border-b-4" : ""
              )}
            >
              Slot Transactions
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/casino_transactions"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/casino_transactions" ? "border-white border-b-4" : ""
              )}
            >
              Casino Transactions
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/bet_types"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/bet_types" ? "border-white border-b-4" : ""
              )}
            >
              Bet Types
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/league"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/league" ? "border-white border-b-4" : ""
              )}
            >
              League
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/sports"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/sports" ? "border-white border-b-4" : ""
              )}
            >
              Sports
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/locations"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/locations" ? "border-white border-b-4" : ""
              )}
            >
              Locations
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/users_online"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/users_online" ? "border-white border-b-4" : ""
              )}
            >
              Users Online
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/countries"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/countries" ? "border-white border-b-4" : ""
              )}
            >
              Countries
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/exclude_events"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/exclude_events" ? "border-white border-b-4" : ""
              )}
            >
              Exclude Events
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/event_statistics"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/event_statistics" ? "border-white border-b-4" : ""
              )}
            >
              Event Statistics
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/logs"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/logs" ? "border-white border-b-4" : ""
              )}
            >
              Logs
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href="/admin/tools/margins"
              className={clsx(
                "inline-block px-4 cursor-pointer pb-2",
                pathname === "/admin/tools/margins" ? "border-white border-b-4" : ""
              )}
            >
              Margins
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default ToolsTab;
