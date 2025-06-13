import { useEffect, useState } from "react";
import  logo from "../../../assets/logoSonatrac.png"
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { usePhase } from "./PhaseContext";
import { useSondageStore } from "../store/sondageStore";


export default function Side_Bar() {
 


  const phases= usePhase() 
  
     useEffect( () => {
      setPhaseIdActive(1)
    } , []
    ) 
  

  
    const [phaseIdActive, setPhaseIdActive] = useState<number | null>(0 ? Number(0) : null) 
    const [isDashboardClicked,setIsDashboardClicked] = useState(0)
    
  const navigate = useNavigate()
   const sondageId = useSondageStore((state)=>state.sondageId)

  return ( 

    <div className='  w-[247px] bg-[#F3F3F3] h-screen fixed flex flex-col items-center pt-3 '>
        <img onClick={()=> navigate(`/accueil/${sondageId}`) } src={logo} alt="" className=' cursor-pointer  size-[73px] ' />
           <div className='font-bold w-[70%]  text-[#2BA5FA] text-[20px] mt-20 flex flex-col space-y-10'>
          {phases.map((p) => (
            <div key={p.id} className='flex flex-col space-y-2 w-'>
              <div
                className='flex items-center space-x-3 cursor-pointer'
                onClick={() =>
                {
                  setPhaseIdActive(phaseIdActive === p.id ? null : p.id) , setIsDashboardClicked(2)
                }
                } 
              >
                {phaseIdActive === p.id ? (
                  <BiSolidDownArrow />  
                ) : (
                  <BiSolidRightArrow />
                )}
                <p>phase {p.name}</p>
              </div>
    
              {phaseIdActive === p.id && (
                <div className='ml-6 mt-2 space-y-2 font-medium'>
                  {/* Tu peux mettre ici Dashboard, Operations, etc. */}
                  <div onClick={()=>{setIsDashboardClicked(0),navigate(`/phases/${phaseIdActive}/dashboard`) } } className={` cursor-pointer  text-[18px] px-2 py-1 rounded w-fit ${ isDashboardClicked===0 ? 'bg-[#2BA5FA] text-white' :  ''} ${ isDashboardClicked===1 ? 'bg-none text-black' :  'text-black'}  `} >
                    Dashboard
                  </div>
                  <div onClick={()=>{setIsDashboardClicked(1),navigate(`/phases/${phaseIdActive}/operations`) }} className= {` cursor-pointer  text-[18px] px-2 py-1 rounded w-fit ${ isDashboardClicked===0 ? 'bg-none text-black' :' ' } ${ isDashboardClicked===1 ? 'bg-[#2BA5FA]  text-white' :' text-black' }  `}>Operations</div>
                </div>
              )}
            </div>
          ))}
        </div>
            <p className=' absolute bottom-0 font-medium text-[16px] text-black pb-[100px] '>© DevEdge 2025</p> 
          </div>
    
  );
} 
