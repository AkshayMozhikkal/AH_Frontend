import BarGraph from './Graphs/BarGraph'
import PieChart from './Graphs/PieChart'

function ReportGraphs() {
  const barInstance = new Bar();
  

  return (
    <div className='flex p-5 mt-20 gap-9 '>
        <BarGraph />
        <PieChart />
       
      
    </div>
  )
}

export default ReportGraphs
