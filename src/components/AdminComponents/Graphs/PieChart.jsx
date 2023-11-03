import React, { useEffect } from 'react';
import { Chart, initTE } from 'tw-elements';

function PieChart() {
  useEffect(() => {
    
    initTE({ Chart });
  }, []);

  return (
    <div className=" w-1/5 overflow-hidden h-[500px] bg-blue-gray-50 sm:w-full">
      <canvas
        data-te-chart="pie"
        data-te-dataset-label="Traffic"
        data-te-labels="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"
        data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]"
        data-te-dataset-background-color="['rgba(63, 81, 181, 0.5)', 'rgba(77, 182, 172, 0.5)', 'rgba(66, 133, 244, 0.5)', 'rgba(156, 39, 176, 0.5)', 'rgba(233, 30, 99, 0.5)', 'rgba(66, 73, 244, 0.4)', 'rgba(66, 133, 244, 0.2)']"
      ></canvas>
    </div>
  );
}

export default PieChart;
