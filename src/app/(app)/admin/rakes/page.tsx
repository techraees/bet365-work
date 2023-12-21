import requireSession from "@/lib/request-session";
import RakesContent from "./RakesContent";
import requireAdminSession from "@/lib/request-admin";

const RakesPage = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();
  await requireAdminSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <p className="text-lg text-white bg-brand-title p-4">Rakes</p>
      <RakesContent />
    </section>
  );
};

export default RakesPage;
