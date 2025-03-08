import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  BookOpen,
  LandPlot,
  PiggyBank,
  Briefcase,
  Truck,
  Settings,
  LogOut,
  User,
  CookingPot,
  BadgePercent,
  Utensils,
  Percent,
  QrCode,
  Wallet,
  Plus,
  UserPen,
  ThermometerSunIcon,
  Boxes,
} from "lucide-react";

const FarmerSidebar = () => {


  return (
    <aside className="sticky top-0 w-64 h-screen bg-white border-r flex flex-col">
      <div className="p-4 flex-grow">
        <div className="flex  items-center gap-2 mb-8">
         <h1>Krishi</h1>
        </div>

        <nav className="space-y-1">
          <SidebarLink href="/farmer" icon={Plus }>
            Add Items
          </SidebarLink>
          <SidebarLink href="/farmer/profile" icon={UserPen }>
            Profile
          </SidebarLink>
          <SidebarLink href="/farmer/3d" icon={Boxes}>
            Inventory Visualization
          </SidebarLink>
         
        
        </nav>
      </div>

      <div className="p-4 border-t">
        
        <SidebarLink href="/" icon={LogOut}>
          Home
        </SidebarLink>
      </div>
    </aside>
  );
};

const SidebarLink = ({ href, icon: Icon, children }) => {
  return (
    <Link
      to={href}
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-100   hover:text-[#021e39] rounded-lg transition-colors duration-150"
    >
      <Icon className="w-5 h-5" />
      {children}
    </Link>
  );
};

export default FarmerSidebar;