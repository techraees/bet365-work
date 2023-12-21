import requireSession from "@/lib/request-session";
import TaxesContent from "./TaxesContent";
import requireAdminSession from "@/lib/request-admin";

const TaxesPage = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();
  await requireAdminSession();
  
  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <p className="text-lg text-white bg-brand-title p-4">Taxes</p>
      <TaxesContent />
    </section>
  );
};

export default TaxesPage;
