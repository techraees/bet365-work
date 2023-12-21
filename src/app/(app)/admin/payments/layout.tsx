import requireSession from "@/lib/request-session";
import PaymentsTab from "../../components/admin/components/admin/payments/PaymentsTab";

const PaymentsLayout = async ({ children }: { children: React.ReactNode }) => {
  await requireSession();

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <PaymentsTab />
      <>{children}</>
    </section>
  );
};

export default PaymentsLayout;
