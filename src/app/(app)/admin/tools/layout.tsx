import requireSession from "@/lib/request-session";
import ToolsTab from "../../components/admin/components/admin/tools/ToolsTab";

const ToolsLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <ToolsTab />
      <>{children}</>
    </section>
  );
};

export default ToolsLayout;
