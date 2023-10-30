import React, { useEffect } from 'react';
import { Chart, initTE } from 'tw-elements';

function BarGraph() {
  useEffect(() => {
    initTE({ Chart });
  }, []);

  return (
    <div className=" w-3/5 overflow-hidden mt-24 bg-blue-gray-50 sm:w-full sm:h-full">
      <canvas
        data-te-chart="bar"
        data-te-dataset-label="Traffic"
        data-te-labels="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']"
        data-te-dataset-data="[2112, 2343, 2545, 3423, 2365, 1985, 987]"
      ></canvas>
    </div>
  );
}

export default BarGraph;
