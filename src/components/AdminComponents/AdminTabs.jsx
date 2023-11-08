import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { UsersTable } from "./UsersTable";
import { PaymentsTable } from "./PaymentsTable";
import { useState } from "react";
import { ComplaintsTable } from "./ComplaintsTable";
import ReportGraphs from "./ReportGraphs";
import { BannerManagement } from "./BannerManagement";

export function AdminTabs() {
  
  const [table, setTable] = useState("Reports");
  
  const data = [
    {
      label: "Reports",
      value: "angular",
      desc: `Overall report about the user traffic, works scheduled.`,
    },
    {
      label: "Users",
      value: "html",
      desc: `List of users currently using the website. The list includes both Artisans and common users.`,
    },
    {
      label: "Banner Management",
      value: "react",
      desc: `Edit and Manage Banners of Homepage`,
    },

    // {
    //   label: "Complaints",
    //   value: "vue",
    //   desc: `Complaints raised by users. Includes the usage difficulties, reports made on another accounts etc`,
    // },

   

    // {
    //   label: "Notifications",
    //   value: "svelte",
    //   desc: `notifications & reminders about pending tasks.`,
    // },
  ];

  const handleTabClick = (label) => {
    setTable(label);
  };

  return (
    <div className="lg:px-32 mt-14 sm:min-w-fit  ">
      <Tabs id="custom-animation" value='angular'>
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => handleTabClick(label)}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      
      {table == "Reports" &&  <ReportGraphs/> }
      {table == "Users" && <UsersTable />}
      {table == "Transactions" && <PaymentsTable />}
      {table == "Complaints" && <ComplaintsTable />}
      {table == "Banner Management" && <BannerManagement />}
     
    </div>
  );
}



