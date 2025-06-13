import React, { useEffect, useState } from 'react'
import { IoNotificationsOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Accueil from '../Accueil';
import { useSondageStore } from '../store/sondageStore';

const NavBar = () => {
  const  sondageId  = useSondageStore((state)=> state.sondageId); 

  const navigate = useNavigate();
  const menu= ["General","phases","operations","days"]
  const [activeMenuItem,setActiveMenuItem] = useState('General')
   const location = useLocation() 
  const [phaseId,setPhaseId] = useState(Number) 

  useEffect( ()=>{ 
  if (location.pathname === `/accueil/${sondageId}`) {
    setActiveMenuItem('General');
  } else if (location.pathname === `/phases/${phaseId}/dashboard`) { 
    setActiveMenuItem('phases');
  } else if (location.pathname === '/operations') {
    setActiveMenuItem('operations');
  } else if (location.pathname === '/days/1/cost') {
    setActiveMenuItem('days');
  }
fetchPhases()
    

  },[location,sondageId]

  )

  const fetchPhases = async () => {
      try {
        const response = await fetch(`/sondages/${sondageId}/phases/`);
        const data = await response.json();
        if (data.operations && data.operations.length > 0) {
          setPhaseId(data.operations[0].id);
        }
      } catch (error) {
        // handle error if needed
      } finally {
        
      }
    };
    
  return ( 
    <div className=' w-screen'>
    <div className='w-screen h-[85px] fixed top-0 z-50 flex justify-between items-center px-12' style={{ background: 'linear-gradient(to right, #5CE1E6, #6FBAEE, #8C52FF)' }}>
       <IoNotificationsOutline onClick={()=>{navigate("/notification")}}  className='cursor-pointer text-[#6FBAEE] bg-white rounded-full text-5xl p-2'   />
        <div className=' xl:space-x-22  lg:space-x-14 8 md:space-x-10  space-x-4    '>
          { menu.map( (m)=>  
          <button onClick={ () => {       
            const path = (() => { 
              if(m==='General') return `/accueil/${sondageId}`
              else if ( m=== 'phases') return `/phases/${phaseId}/dashboard`
              else if  ( m=== 'operations') return `/operations`
              else return `/days/1/cost` 
             })();
             navigate(path) } }
             className={`  text-[24px] font-medium  ${ m===activeMenuItem ? " text-[#6FBAEE] bg-white " : "text-white " } `} >
               {m} </button>

          ) }

        </div>
        <CiSettings onClick={()=>{navigate("/settingsPhase")}}  className=' cursor-pointer text-[#6FBAEE] bg-white rounded-full text-5xl p-1'   />

    </div>
    
    </div>
    


  )
}

export default NavBar
