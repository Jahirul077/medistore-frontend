import Navbar from "@/shared/landingShared/Navbar";
import Footer from "@/shared/landingShared/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="main-layout flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
