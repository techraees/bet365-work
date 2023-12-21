import requireSession from "@/lib/request-session";
import CommissionsContent from "./CommissionsContent";
import requireAdminSession from "@/lib/request-admin";

const CommissionsPage = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();
  await requireAdminSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <p className="text-lg text-white bg-brand-title p-4">Commissions</p>
      <CommissionsContent />
    </section>
  );
};

export default CommissionsPage;
