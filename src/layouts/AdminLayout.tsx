import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  return (
    <>
    <div className="flex min-h-screen  overflow-clip rounded-md bg-slate-100">
      <div className="">
        <AdminSidebar />
      </div>
      <div className="max-h-[calc(100vh-1rem) basis-full mt-[0.5rem]] overflow-y-scroll rounded-md bg-white">
        <Outlet /> 
      </div>
    </div>
    </>
  );
}
