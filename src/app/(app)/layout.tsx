import "../globals.css";
import PrimaryHeader from "./components/PrimaryHeader";
import SecondaryHeader from "./components/SecondarHeader";

export const metadata = {
  title: "Bet with bet365 - Live Online Betting",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  HandheldFriendly: "true",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <body>
        <div className=" text-xs bg-[#282828] leading-[0px] antialiased min-h-[100vh]">
          <header>
            <SecondaryHeader />
            <PrimaryHeader />
          </header>
          <main>{children}</main>
        </div>
      </body>
    </>
  );
}
