import { Outlet } from "react-router-dom";
import FarmerSidebar from "../components/FarmerSidebar";

export default function FarmerLayout() {
  return (
    <>
    <div className="flex min-h-screen  overflow-clip rounded-md bg-slate-100">
      <div className="">
        <FarmerSidebar/>
      </div>
      <div className="max-h-[calc(100vh-1rem) basis-full mt-[0.5rem]] overflow-y-scroll rounded-md bg-white">
        <Outlet /> 
      </div>
    </div>
    </>
  );
}