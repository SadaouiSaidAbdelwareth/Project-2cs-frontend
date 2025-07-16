import React, { useEffect, useState } from 'react'
import  logo from "../../assets/logoSonatrac.png"
import { CostBar, DelaiBar } from './Accueil'
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { GoAlertFill } from "react-icons/go";
import PhaseOp from './PhaseOp';
import { useNavigate, useParams } from 'react-router-dom';
import { PhaseContext, usePhase } from './components/PhaseContext';
import { Phase, Sondage } from '../../types/sondage';
import { useSondageStore } from './store/sondageStore';
import { fetchSondage } from '../../services/sondageServices';
import { Phase2 } from './components/SideBarLayout';


const PhaseDash = () => {

  const { phaseId } = useParams<{ phaseId?: string }>()
  



  const phases:Phase[] = usePhase();   

  const [phase, setPhase] = useState<Phase2|null>();

  useEffect(() => {   
    if (phaseId) {
      fetch(`/phases/${phaseId}/`)
        .then((res) => res.json())
        .then((data) => setPhase(data.phase))
        .catch(() =>setPhase(null));
    }
  }, [phaseId]);


 


  return (

      <div className='  mt-[85px]   ml-[247px]   flex flex-col  space-y-6 p-6 '>
         <div className=' flex px-12 justify-between items-center text-[20px]  text-[#8C52FF] font-bold '> 
            <p className=' text-2xl'>
              {phases.find((p) => p.id === Number(phaseId))?.name || `Phase ${phaseId}`} 
              
            </p> 
            <div className=' text-xl flex space-x-3  p-3.5    '>
              <p className=' text-black  font-bold'>From  </p> 
              <p className=' text-[#6FBAEE] '>{phases
              .find((p) => p.id === Number(phaseId))
              ?.starting_date
              ? new Date(
                phases.find((p) => p.id === Number(phaseId))!.starting_date 
                ).toLocaleDateString('fr-FR')
              : ''}</p>
               <p className=' text-black font-bold'>to</p>
                <p className=' text-[#6FBAEE] '> {phases
              .find((p) => p.id === Number(phaseId))
              ?.estimated_ending_date
              ? new Date(
                phases.find((p) => p.id === Number(phaseId))!.estimated_ending_date
                ).toLocaleDateString('fr-FR')
              : ''}</p>
            </div>
            <p>
              {
              phases.find((p) => p.id === Number(phaseId))?.starting_date
                ? new Date(
                  phases.find((p) => p.id === Number(phaseId))!.starting_date
                ).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
                : ''
              }
            </p>
         </div>

        
        

         <div className='  w-full flex flex-col items-center'>
           <div className=' h-[218px] w-full bg-[#F3F3F3] rounded-2xl flex flex-col justify-between items-center py-8 px-26 '>
                   <CostBar cout={Number(phase?.cout)} seuil={Number(phase?.estimated_cout)} />
                   <DelaiBar delai={Number(phase?.days)} seuil={Number(phase?.estimated_days)}  />  

                 
         
              </div>


          <div className=' flex items-center space-x-2 pt-4'>
          <GoAlertFill size={'35px'} className=' text-[#FFCE31] ' />
          <p className=' text-2xl text-[#ffc400] font-bold  '> Problèmes essentiels</p>
          </div>

            
            <div className="grid w-[100%] grid-cols-2 gap-4 mt-8">
              {phase?.problems
              ?.map((probleme) => (
                <div
                key={probleme.id}
                className="bg-[#F3F3F3] shadow-xl h-[181px] rounded-lg p-4 px-6 flex flex-col space-y-2"
                >
                <div
                  className={ `text-white px-2 py-1 rounded w-fit text-[20px] self-center ${
                  probleme.degre === 1
                    ? "bg-[#FFD700]"
                    : probleme.degre === 2
                    ? "bg-[#FFA500]"
                    : "bg-[#FF0000]"
                  }`}
                >
                  {probleme.title}
                </div>
                <p className="text-gray-700 text-[17px] ">
                  {probleme.description}{" "}
          
                </p>
                </div>
              ))} 

            
            </div>
            
           
           

         






          
           
         </div>




      </div>
    



      




     
   




  )
}

export default PhaseDash
