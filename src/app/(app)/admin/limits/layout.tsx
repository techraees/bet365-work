import requireSession from "@/lib/request-session";
import LimitsTab from "../../components/admin/components/admin/limits/LimitsTab";
import requireAdminSession from "@/lib/request-admin";

const LimitsLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();
  await requireAdminSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <LimitsTab />
      <>{children}</>
    </section>
  );
};

export default LimitsLayout;
