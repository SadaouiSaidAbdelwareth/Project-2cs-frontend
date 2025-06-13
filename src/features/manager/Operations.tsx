import React, { useEffect, useState } from 'react'
import  logo from "../../assets/logoSonatrac.png"
import { CostBar, DelaiBar } from './Accueil'
import { useNavigate } from 'react-router-dom'
import { useSondageStore } from './store/sondageStore'




const Operations = () => { 

  const [operations, setOperations] = useState<{id: number, name: string, real_cout: number, estimated_cout: number, sondage: number}[]>([])

  const [isOperationsLoaded,setIsOperationsLoaded] = useState(false)
  
  useEffect(() => {
    fetchOperations().then((data) => { 
      setIsOperationsLoaded(true),
       setOperations(data)  
       setCurrent_real_cout(data.find((ope: {id: number, name: string, real_cout: number, estimated_cout: number, sondage: number})=>ope.id===1 )?.real_cout )
      setCurrent_estimated_cout(data.find((ope: {id: number, name: string, real_cout: number, estimated_cout: number, sondage: number})=>ope.id===1 )?.estimated_cout)
    })
      .catch((error) => { console.error('Error fetching all operations of this sondage:', error); }) 
     
  }, [])
                                           

  const fetchOperations = async ()=> {    
    const response = await fetch(`/sondages/${sondageId}/operations/`)  
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);   
    const data = await response.json()  
    return data.operations 

  }  

  const [idOperationClicked,setIdOperationClicked] = useState(1)

  const [current_real_cout,setCurrent_real_cout]= useState(operations.find((ope)=>ope.id===1 )?.real_cout )
  const [current_estimated_cout,setCurrent_estimated_cout]= useState(operations.find((ope)=>ope.id===1 )?.estimated_cout)

const navigate = useNavigate()
   const sondageId = useSondageStore((state)=>state.sondageId)


  return (
    <div className=' flex  w-screen mt-[85px]'>
      <div className='  w-[247px] bg-[#F3F3F3] h-screen fixed flex flex-col items-center pt-3 '>
        <img onClick={()=> navigate(`/accueil/${sondageId}`) } src={logo} alt="" className=' cursor-pointer  size-[73px] ' />

        {isOperationsLoaded ? 

        <div className='days-list overflow-auto   flex flex-col space-y-2 mt-12 h-[60%] px-16'>
          {operations.map((ope)=> 
          <p key={ope.id} onClick={()=> 
            {setIdOperationClicked(ope.id),setCurrent_real_cout(ope.real_cout),setCurrent_estimated_cout(ope.estimated_cout) } } 
            className={`text-[20px] font-semibold cursor-pointer p-2 ${idOperationClicked === ope.id ? ' bg-[#6FBAEE] rounded-xl text-white ':' bg-none text-[#6FBAEE] '  } `} >{ope.name}</p>
        ) }
        </div>
        :
        <div className='flex justify-center items-center h-full'>
          {/* Spinner SVG */}
          <svg className="animate-spin h-8 w-8 text-[#6FBAEE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg> 
        </div>
        
      }
        


        <p className=' absolute bottom-0 font-medium text-[16px] text-black pb-[100px] '>© DevEdge 2025</p> 

      </div>
      <div className='  ml-[247px] w-full  mt-8 px-7 flex flex-col items-center space-y-40  '>
        <p className='    font-semibold text-[24px] text-[#6FBAEE] '>Vous pouvez  ci-dessous consulter les statistiques de l operation {idOperationClicked} !</p>

        <div className=' h-[118px] w-full bg-[#F3F3F3] rounded-2xl flex  justify-between items-center py-8 px-26 '>
          {isOperationsLoaded ===false ? 
          <svg className="animate-spin h-8 w-8 text-[#6FBAEE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg> 
          : null }
              <CostBar cout={current_real_cout ?? 0 } seuil={current_estimated_cout ?? 0} />
                           
                         
                 
        </div>

      </div>
      
    </div>
  )
}

export default Operations
