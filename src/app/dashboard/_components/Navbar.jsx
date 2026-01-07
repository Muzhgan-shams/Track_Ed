"use client";
import { CheckCircle, LayoutDashboard, Settings, Users } from "lucide-react";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function Navbar() {
  const { user } = useKindeBrowserClient();
  const menuList = [
    { id: 1, name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    {
      id: 2,
      name: "Students",
      icon: Users,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: CheckCircle,
      path: "/dashboard/attendance",
    },
    { id: 4, name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];
  const path = usePathname();
  useEffect(() => {
    // console.log("Current Path:", path);
  }, [path]);
  return (
    <div className="border shadow-md h-screen p-5">
      <Image
        src="/TrackEdLogo.png"
        width={40}
        height={20}
        alt="Logo"
        className="inline"
      />
      <span className="font-bold text-[#6A7CFF] text-xl pl-1">TrackEd</span>
      <hr className="my-5" />
      {menuList.map((menu, index) => (
        <Link key={index} href={menu.path}>
          <h2
            className={`flex  items-center gap-3 py-4 px-3 cursor-pointer m-2 rounded-lg text-sm text-gray-600 hover:bg-[#e9ebff] hover:text-[#6a7cff] transition ${
              path === menu.path && "bg-[#e9ebff] text-[#6a7cff]"
            }`}
          >
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}
      <div className="flex py-4 px-3 fixed bottom-5 items-center gap-3">
        {user?.picture ? (
          <Image
            src={user.picture}
            width={35}
            height={35}
            alt="user"
            className="rounded-full"
          />
        ) : null}
        <div>
          <h2 className="text-sm font-bold">
            {user?.given_name} {user?.family_name}
          </h2>
          <h2 className="text-gray-400 text-xs">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
