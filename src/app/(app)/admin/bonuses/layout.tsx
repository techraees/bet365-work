import requireSession from "@/lib/request-session";
import BonusesTab from "@/app/(app)/components/admin/components/admin/bonuses/BonusesTab";
import requireAdminSession from "@/lib/request-admin";

const BonusesLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();
  await requireAdminSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <BonusesTab />
      <>{children}</>
    </section>
  );
};

export default BonusesLayout;
