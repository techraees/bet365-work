import ReportsTab from "../../components/admin/components/admin/reports/ReportsTab";
import requireSession from "@/lib/request-session";

const ReportsLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <ReportsTab />
      <>{children}</>
    </section>
  );
};

export default ReportsLayout;
