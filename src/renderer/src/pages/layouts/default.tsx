import * as Clb from "@radix-ui/react-collapsible";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useState } from "react";

export function Default(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  return (
    <Clb.Root defaultOpen onOpenChange={(val)=>setIsSidebarOpen(val)} className="h-screen w-screen bg-rotion-900 text-rotion-100 flex">

      <Sidebar />
      <div className="flex-1 flex flex-col max-h-screen">
        <Header isSideBarOpen={isSidebarOpen}/>
        <Outlet />
      </div>
    </Clb.Root>
  )
}

