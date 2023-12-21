import PrimaryHeader from "@/app/(app)/components/PrimaryHeader";
import SecondaryHeader from "@/app/(app)/components/SecondarHeader";

export default function CasinoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" text-xs bg-[#282828] leading-[0px] antialiased min-h-[100vh]">
      <header>
        <SecondaryHeader />
        <PrimaryHeader />
      </header>
      <main>{children}</main>
    </div>
  );
}
