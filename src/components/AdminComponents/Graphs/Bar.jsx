
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import { WorkBaseURL } from "../../../constants/constants";

const Bar = () => {
  const [keys, setKeys] = useState([])
  const [values,setValues] = useState([])
  const [years,setYears] = useState([])
  const [month,setMonth] = useState(10)
  const [year,setYear] = useState(2023)
  const [months,setMonths] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ])
  
  

  const fetchData = async () => {
    console.log(year,month,"year and month");
    try {
      const res = await axios.get(`${WorkBaseURL}post_count/${year}/${month}`);
      
      const keyss = Object.keys(res.data);
      const valuess = Object.values(res.data);
  
      setKeys(keyss)
      setValues(valuess)
    } catch (error) {
      console.log(error, "Barfetch errorr");
    }
  };
  
  
  

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: keys,
    },
  }

  const series = [
    {
      name: "series-1",
      data: values,
    },
  ]

  useEffect(()=>{
    
  const year = (new Date()).getFullYear();
  const yearsArray = Array.from(new Array(20), (val, index) => index + year);
  setYears(yearsArray);
    fetchData();

  },[])

  return (
    <div className="app">
      <div className="row">
        <h4>Posts Shared</h4>
        <select onChange={(e)=>setMonth(e.target.value)}>
     {
       months.map((month, index) => {
         return <option key={`year${index}`} value={index+1} >{month}</option>
       })
     }
    </select>
        <select onChange={(e)=>setYear(e.target.value)}>
     {
       years.map((year, index) => {
         return <option key={`year${index}`} value={year} >{year}</option>
       })
     }
    </select>
    <button className="ml-3 px-2 text-white bg-blue-500 rounded-sm" onClick={()=>fetchData()}>Get</button>
        
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width="500" />
        </div>
      </div>
    </div>
  );
};

export default Bar;
