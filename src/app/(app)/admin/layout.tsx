import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ModalProvider } from "../components/admin/contexts/ModalContext";
import PrimaryHeader from "../components/admin/components/admin/PrimaryHeader";
import Sidenav from "../components/admin/components/Sidenav";
import SecondaryHeader from "../components/SecondarHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <SecondaryHeader/>
        <PrimaryHeader />
      </header>
      <div className="flex flex-row">
        <Sidenav />
        <ModalProvider>
          <main className="w-full h-[calc(100vh-60px)] bg-[#545454]">
            {children}
          </main>
        </ModalProvider>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </>
  );
}
