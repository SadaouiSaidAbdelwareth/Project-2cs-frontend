import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart'; 
const PhaseOp = () => {

  // fetch all operation apartir de id phase 
  // let phaseId = 1; // Removed as it's unused
  const [operations, setOperations] = useState<{ operation_id: number; operation_name: string; total_cout: number }[]>([])
  const {phaseId} = useParams()  



  useEffect( () => {
   fetchOperations().then((data) => setOperations(data))
    .catch ( (error)=>  {console.error('Error fetching sondages:', error);} )
   
 
    
  }, []

  )

const fetchOperations = async () => { 
  const response = await fetch(`/phases/${phaseId}/operations/`); 
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  return data.operations || []; 
};

const calculeTotalCostOperation=()=> {
let total =0;
  operations.map((oper)=> {
total+=oper.total_cout
  }
  )
    return total
}


          const data = operations.map((oper, index) => ({
            label: oper.operation_name,
            value: oper.total_cout,
          }));




  return (
    
    <div className='  mt-[85px] px-12   ml-[247px] flex flex-col items-center space-y-12 '>

      <p className=' text-[#8B55FF] font-semibold text-[24px] flex flex-col mt-4 space-y-0.5 items-center '>
      <p> Vous pouvez ci-dessous les opérations de la phase {phaseId} ,leurs coûts respectifs</p> 
       <p> et leurs contributions par rapport à cette phase.  </p> 
     
      </p>

         <div className=' flex flex-col w-full space-y-2'>
          { operations.map( (oper)=> (
            
            <div key={oper.operation_id} className=' flex justify-between '>
              <p className=' text-[24px] font-medium w-[40%] '>{oper.operation_name} </p>
              <p className=' text-[#078800] text-[24px] font-bold'>{ oper.total_cout.toFixed()} $</p>
              <p className=' text-black text-[24px] font-bold'>{ (oper.total_cout / calculeTotalCostOperation() * 100).toFixed(2) } %</p>



            </div>
          )

          ) }

         </div>


         <div className=' w-full h-[450px] flex items-center justify-center rounded-2xl bg-[#F3F3F3]  '>
         

        <PieChart
  
  series={[
    {
      data: data,
       highlightScope: { fade: 'global', highlight: 'item' },
      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
      
    },
  ]}
   width={300}
  height={300}
/>

             


          

         </div>

      
      
    </div>
  )
}

export default PhaseOp
