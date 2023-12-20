import requireSession from "@/lib/request-session";
import BonusesTab from "@/app/(app)/components/admin/components/admin/bonuses/BonusesTab";

const BonusesLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <BonusesTab />
      <>{children}</>
    </section>
  );
};

export default BonusesLayout;
