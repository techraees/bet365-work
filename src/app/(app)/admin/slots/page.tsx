import requireSession from "@/lib/request-session";
import SlotsContent from "./SlotsContent";

const TaxesPage = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <p className="text-lg text-white bg-brand-title p-4">Slots</p>
      <SlotsContent />
    </section>
  );
};

export default TaxesPage;
