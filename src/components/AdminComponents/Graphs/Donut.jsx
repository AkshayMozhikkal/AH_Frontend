import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { userBaseURL } from '../../../constants/constants';


function Donut() {
  
  const [seriesData, setSeriesData] = useState([1,1])

  const fetchUsers= async() =>{
    try {
      const res = await axios.get(`${userBaseURL}`)
      console.log(res?.data,"UserFetchSuccess");
      const userCount = res?.data?.filter((user)=>!user.is_artisan) 
      const artisanCount = res?.data?.filter((user)=>user.is_artisan)
      
      setSeriesData([userCount.length,artisanCount.length])
      
    } catch (error) {
      console.log(error,"usersFetch Error");
      
    }
  }
    const chartData = {
        options: {
          labels: ['Normal Users','Artisans'],
        },
        series: seriesData ,
      };
      useEffect(()=>{
        fetchUsers();
        
      },[])

  return (
    
    <div className="donut-chart">
    <ReactApexChart options={chartData.options} series={chartData.series} type="donut" width="400" />
  </div>
  )
}

export default Donut