import requireSession from "@/lib/request-session";
import LimitsTab from "../../components/admin/components/admin/limits/LimitsTab";

const LimitsLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <LimitsTab />
      <>{children}</>
    </section>
  );
};

export default LimitsLayout;
