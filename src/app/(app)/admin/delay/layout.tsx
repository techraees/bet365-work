import requireSession from "@/lib/request-session";
import DelayTab from "../../components/admin/components/admin/delay/DelayTab";
import requireAdminSession from "@/lib/request-admin";

const DelayLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();
  await requireAdminSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <DelayTab />
      <>{children}</>
    </section>
  );
};

export default DelayLayout;
