import requireSession from "@/lib/request-session";
import DelayTab from "../../components/admin/components/admin/delay/DelayTab";

const DelayLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <DelayTab />
      <>{children}</>
    </section>
  );
};

export default DelayLayout;
