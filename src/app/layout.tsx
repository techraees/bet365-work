import "./globals.css";
import Link from "next/link";
import PrimaryHeader from "./components/PrimaryHeader";
import SecondaryHeader from "./components/SecondarHeader";

export const metadata = {
  title:
    "Bet with bet365 – Live Online Betting Sportsbook – Latest Bets and Odds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" text-xs bg-[#282828] leading-[0px] antialiased">
        <header>
          <SecondaryHeader />
          <PrimaryHeader />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
