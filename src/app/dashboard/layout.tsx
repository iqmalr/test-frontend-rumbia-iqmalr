import { SideBar } from "@/components/fragments/SideBar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SideBar>{children}</SideBar>;
};

export default DashboardLayout;
