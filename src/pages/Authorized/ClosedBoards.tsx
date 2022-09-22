import React from "react";
import { Sidebar } from "../../components/";
import { AppLayout, MainLayout } from "../../layouts";

export const ClosedBoards = () => {
  return (
    <AppLayout>
      <Sidebar />
      <MainLayout title="Closed Boards">"</MainLayout>
    </AppLayout>
  );
};
