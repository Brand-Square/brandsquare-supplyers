import { DashboardHeader } from "@/components/layouts/DashboardHeader";
import { SideBar } from "@/components/layouts/Sidebar/index";



const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="grid xl:grid-cols-[auto_1fr] min-h-screen grid-cols-1 bg-[#F6F7F9]">
      <div className="xl:block hidden">
        <SideBar />
      </div>

      <main className="">
        <DashboardHeader />
        <div className="pt-8 pb-11 px-5 max-w-[90rem] mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default layout;
