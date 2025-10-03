import React, { ReactNode } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ContractsManager from "@/components/admin/ContractsManager";

interface AdminLayoutProps {
  title: string;
  children: ReactNode;
}

function AdminLayoutInternal({ title, children }: AdminLayoutProps) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default function AdminContracts() {
  // AdminLayout provides the frame via <Outlet />. This page should only render its content.
  return <ContractsManager />;
}
