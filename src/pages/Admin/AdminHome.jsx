import React from "react";
import { AdminNavbar } from "../../components/AdminComponents/AdminNavbar";
import { AdminTabs } from "../../components/AdminComponents/AdminTabs";
import { SimpleFooter } from "../../components/AdminComponents/Footer";
import { SpeedDialWithTextInside } from "../../components/SpeedDial/SpeedDial";

function AdminHome() {
  return (
    <div>
      <AdminNavbar />
      <AdminTabs />
      <SimpleFooter />
      <SpeedDialWithTextInside />
    </div>
  );
}

export default AdminHome;
