import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Navbar,
} from "@material-tailwind/react";
import { UsersTable } from "./UsersTable";
import { PaymentsTable } from "./PaymentsTable";
import { useState } from "react";
import { ComplaintsTable } from "./ComplaintsTable";
import ReportGraphs from "./ReportGraphs";

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
      label: "Transactions",
      value: "react",
      desc: `Payments made by users to Artisans upon confirmation of work contract.`,
    },

    {
      label: "Complaints",
      value: "vue",
      desc: `Complaints raised by users. Includes the usage difficulties, reports made on another accounts etc`,
    },

   

    {
      label: "Notifications",
      value: "svelte",
      desc: `notifications & reminders about pending tasks.`,
    },
  ];

  const handleTabClick = (label) => {
    setTable(label);
  };

  return (
    <div className="lg:px-32 mt-14 sm:min-w-fit  ">
      <Tabs id="custom-animation" value="html">
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
          onClick={() => console.log(table)}
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
     
    </div>
  );
}



