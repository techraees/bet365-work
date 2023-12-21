import requireSession from "@/lib/request-session";
import ToolsTab from "../../components/admin/components/admin/tools/ToolsTab";
import requireAdminSession from "@/lib/request-admin";

const ToolsLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();
  await requireAdminSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <ToolsTab />
      <>{children}</>
    </section>
  );
};

export default ToolsLayout;
