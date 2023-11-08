import Bar from './Graphs/Bar'
import BarGraph from './Graphs/BarGraph'
import Donut from './Graphs/Donut'
import PieChart from './Graphs/PieChart'

function ReportGraphs() {
  
  

  return (
    <div className='flex p-5 mt-20 gap-40 '>
        <Donut/>
        <Bar/>
       
       
      
    </div>
  )
}

export default ReportGraphs
