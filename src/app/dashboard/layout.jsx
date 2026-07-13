import Sidebar from "@/shared/dashboardShared/Sidebar";
import TopNavbar from "@/shared/dashboardShared/TopNavbar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <main className="w-full h-screen flex relative bg-background">
      <div className="xl:w-[280px] h-screen xl:block hidden border-r shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full xl:w-[calc(100%-280px)] h-screen overflow-hidden">
        <div className="w-full h-auto xl:h-[80px] flex flex-col justify-center px-4 md:px-8 py-4 bg-white/50 backdrop-blur-md xl:bg-transparent border-b">
          <TopNavbar />
        </div>

        <div className="w-full h-[calc(100%-80px)] overflow-auto custom-scrollbar p-10 relative">
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
