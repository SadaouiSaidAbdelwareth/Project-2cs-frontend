import { useEffect, useState } from 'react'
import { fetchSondages } from '../../services/sondageServices'
import { Sondage } from '../../types/sondage'
import { useNavigate } from 'react-router-dom'
import { IoNotificationsOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";

export const SondageList = () => { 
  // recuper list sondage from endPoint et la metttre dans state 
  const [sondages, setSondages] = useState< Sondage[]>([]) 
  const [sondageClicked, setSondageClicked] = useState(Number)
  const navigate = useNavigate()   


// a chaque fois le componenets est rendu on va recuperer la liste des sondages
        useEffect(() => {
          fetchSondages() .then((data) => {setSondages(data) })
          .catch((error) => {console.error('Error fetching sondages:', error);});
        },[]) 

        const user = JSON.parse(localStorage.getItem("user") || "{}") ;
        
      
          


        return (            
          <div className='  flex flex-col items-center h-screen w-screen'> 
            <div className=' flex justify-between h-[89px] w-full items-center  bg-[#5CA0E6] px-12'>
            <IoNotificationsOutline onClick={()=>{navigate("/notification")}}  className='cursor-pointer text-[#6FBAEE] bg-white rounded-full text-5xl p-2'   />
            <CiSettings onClick={()=>{navigate("/settingsPhase")}}  className=' cursor-pointer text-[#6FBAEE] bg-white rounded-full text-5xl p-1'   />



            </div>
            <div className=' relative  flex flex-col items-center w-[82%] mt-5'>

            <div className='flex '>
            <p className='text-[24px] text-[#8C52FF] font-semibold '>Liste des Sondages</p>
            </div>
            <p className='text-[24px] text-[#8C52FF] font-semibold mt-12 mb-8'>Veuillez sélectionnez un sondage pour le visualiser en détails</p>
            <div className=' flex flex-col w-full gap-[30px] overflow-auto h-[60vh]'>
              {sondages.map((sondage) => (
              <div key={sondage.id} className={` ${sondageClicked===sondage.id ? ' bg-blue-200':' bg-[#F3F3F3]' } flex justify-between items-center  h-[98px] w-[93%] rounded-lg p-4 px-7 shadow-md`}>
                <div className=' flex items-center space-x-6'>
                <p className='text-[24px] text-black  font-bold'>Sondage {sondage.id}</p>
                <p className='text-[19px] text-[#6FBAEE] font-bold '>{sondage.started_date}</p>
                </div>
                <input 
                type="radio"  
                name="sondage" 
                checked={sondageClicked === sondage.id} 
                onChange={() => setSondageClicked(sondage.id)} 
                className="  cursor-pointer form-radio text-[#6FBAEE] !w-6 !h-6   border-2 border-[#6FBAEE]  rounded-full  checked:border-[#ffffff] checked:bg-[#6FBAEE]  "
                />
                 
              </div>
              
              ))}

               
            </div>
            <button 
            onClick={() => {
             if (sondageClicked) {  
               navigate(`/accueil/${sondageClicked}`);
             } else {
               alert("Veuillez selectionner un sondage");
             }
            }}
            
             className='bg-[#6FBAEE] w-[14%] text-white px-4 py-2 rounded mt-6 font-bold'>Visualiser</button>
              <button onClick={()=> { navigate("/sondageForm")} } className=' bg-[#6FBAEE]  absolute top-2 right-8'>+ Créer sondage</button>



            </div>
          


          </div>


        


        )  




} 