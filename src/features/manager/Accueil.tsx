import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import  logo from "../../assets/logoSonatrac.png"
import { BiSolidDownArrow } from "react-icons/bi";  
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSondage } from '../../services/sondageServices';
import { Phase, Sondage } from '../../types/sondage';
import  { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { useSondageStore } from './store/sondageStore';






  
const Accueil = () => {  

   const { sondageId } = useParams<{ sondageId?: string }>();

   const setSondageId = useSondageStore((state)=> state.setSondageId)
     const [loaded,setLoaded] = useState(false)  
     const [errorMessage, setErrorMessage] = useState<string | null>(null);
     const [errorMessagePhase, setErrorMessagePhase] = useState<string | null>(null);

     

  useEffect(() => {
    if (sondageId !== undefined) {
      setSondageId(sondageId);

      fetchSondage(Number(sondageId))
        .then((data) => {
          setDate(new Date(data.started_date));
          setCout(data.real_cout);
          setCoutSeuil(data.estimated_cout);
          setDelai(Number(data.days));

          const startDate = new Date(data.started_date);
          const endDate = new Date(data.days_estimated);
          const diffTime = endDate.getTime() - startDate.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDelaiSeuil(diffDays); 

          const fetchPhases = async () => { 
           const response = await fetch (`/sondages/${sondageId}/phases/`)
           const data =await response.json()
           setPhases(data.operations)
           return data
          };

          fetchPhases();

          setLoaded(true);
        })
        .catch((error) => {
                    
          console.error("Erreur lors du fetch :", error);

          if (error.name === "TimeoutError") {
            setErrorMessage("⏱️ Le serveur met trop de temps à répondre.");
          } else if (error.name === "NetworkError") {
            setErrorMessage("📡 Connexion perdue. Vérifiez votre réseau.");
          } else if (error.name === "HttpError") {
            if (error.status >= 500) {
              setErrorMessage("🔥 Erreur serveur. Essayez plus tard.");
            } else if (error.status >= 400) {
              setErrorMessage("⚠️ Requête invalide ou données incorrectes.");
            } else {
              setErrorMessage("❌ Erreur inconnue.");
            }
          } else {
            setErrorMessage("❓ Erreur imprévue.");
          }
        });
    }
  }, [sondageId]);



  const [date, setDate] = useState<Date | null>(null)   

    const [cout,setCout] = useState(Number)
    const [coutSeuil,setCoutSeuil] = useState(Number) 
 
  const [delai,setDelai] = useState(Number) 
    const [delaiSeuil,setDelaiSeuil] = useState(Number) 

      // eache day ===> deepth 
      const [phases, setPhases] = useState<Phase[]>([]);




const data_prevision = phases.map(phase => {    
  return {
    name: phase.name,
    depth: phase.estimated_depth,
  };
});

// Données fictives pour le graphique "Réel"
const data_reel = [
  { name: "8``1/2", depth: 9450 },
  { name: "12``1/4", depth: 6137 },
  { name: "16``", depth: 3280 },
  { name: "26``", depth: 306 },
];
/*
const data_reel = phases.map(phase => { 
  return {
    name: phase.name,
    depth: phase.depth,
  };
}).reverse();
*/
  
      
const navigate = useNavigate()

    
        
  return (  
    
    <div className='  flex w-screen mt-[85px] '>
      <div className=' w-[247px] bg-[#F3F3F3] h-screen fixed flex flex-col justify-between items-center pt-3 '>
        <img  src={logo} alt="" className=' cursor-pointer  size-[73px] ' />
        <p className=' font-medium text-[16px] text-black pb-[100px] '>© DevEdge 2025</p> 
      </div>

      {loaded===false && errorMessage===null ? 
          <div className=' absolute top-[50%] right-[50%] flex justify-center items-center'>
          <svg className="animate-spin h-8 w-8 text-[#6FBAEE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </div> 
          :
          errorMessage ?
          <div className='absolute top-[50%] right-[40%]  text-black-500 text-xl'>
            {errorMessage}
          </div>
          :
      <div className=' ml-[247px]  flex flex-col w-full space-y-4 p-6'>
         <div className=' flex px-12 justify-between text-[#8C52FF] font-bold '> 
            <p className=''>{date ? date.toLocaleDateString() : ''} </p>
            <p> {date ? date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) :'' } </p>   
         </div>

         
         <div className=' h-[218px] w-full bg-[#F3F3F3] rounded-2xl flex flex-col justify-between items-center py-8 px-26 '>
          <CostBar cout={cout} seuil={coutSeuil} />
          <DelaiBar delai={delai} seuil={delaiSeuil}  />
        
        

         </div>
          
        
          
          

        { errorMessagePhase ?
        <div className='text-black-500 text-xl'>
            {errorMessagePhase} 
        </div> 
        :  
        <div className=" px-15  w-full flex  h-[400px]">

          <div className='  flex flex-col items-center space-y-10  w-[50%] '>
            <p className=' text-2xl font-bold'>Prévision</p>
            <ResponsiveContainer width="90%" height="100%">
            <BarChart
              
              
              width={500}
              height={300}
              data={data_prevision}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" orientation='top' tick={false} axisLine={false} />
              <YAxis dataKey='depth' reversed={true} tick={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="depth"  fill="#EC8C34"  barSize={40}  />
            </BarChart>
          </ResponsiveContainer>
          </div>


          <div className=' flex flex-col items-center space-y-10  w-[50%] '>
           <p className=' text-2xl font-bold'>Réel</p>

          <ResponsiveContainer width="90%" height="100%">
            <BarChart
              
              
              width={500}
              height={300}
              data={data_reel}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" orientation='top' tick={false} axisLine={false} />
              <YAxis reversed={true} tick={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="depth"  fill="#078800"  barSize={40}  />
            </BarChart>
          </ResponsiveContainer>


          </div>
        </div>
           } 
        

        

      





      </div>
      }
     
      
  
    </div>

   


    
  )
}    

export default Accueil ;


interface CostBarProps {
  cout: number;
  seuil: number;
}

export const CostBar = ({ cout, seuil }: CostBarProps) => {
  const seuilVert = seuil * 0.5; // 50% of the threshold
  const seuilJaune = seuil; // Threshold value
  const seuilRouge = seuil * 1.5; // 150% of the threshold

  const getColor = () => {
    if (cout <= seuilVert) return 'bg-green-500';
    if (cout <= seuilJaune) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPosition = () => {
    const max = seuilRouge;
    const percentage = Math.min((cout / max) * 100, 100);
    return `${Math.max(0, percentage)}%`; // Ensure the position is within bounds
  };

  return (
    <div className="grid grid-cols-[10ch_1fr_15ch] items-center w-[80%]">
      <p className="mr-2 font-bold text-[20px]">Coût</p>
      <div className="relative  flex-1  h-[50px] bg-gray-300 rounded-lg overflow-hidden">
        <div className="absolute top-0 left-0 h-[50px]" style={{ width: '50%', backgroundColor: 'green' }}></div>
        <div className="absolute top-0 left-1/2 h-[50px]" style={{ width: '25%', backgroundColor: 'yellow' }}></div>
        <div className="absolute top-0 left-3/4 h-[50px]" style={{ width: '25%', backgroundColor: 'red' }}></div>

        <div
          className="absolute top-0 w-full transform -translate-y-1/2 group "
          style={{ left: getPosition() }}
        >
          <BiSolidDownArrow className=" text-5xl text-black" />
          <p className=' text-lg absolute bg-none text-black font-bold  opacity-0 group-hover:opacity-100'>
            {cout} $
          </p>
        </div>
      </div>
      <p className="ml-2 text-[20px] text-green-700 font-bold">{seuil.toLocaleString()} $</p>
    </div>
  );
};

export const DelaiBar = ({ delai, seuil }: { delai: number; seuil: number }) => {
  const seuilVert = seuil * 0.5; // 50% of the threshold
  const seuilJaune = seuil; // Threshold value
  const seuilRouge = seuil * 1.5; // 150% of the threshold

  const getColor = () => {
    if (delai <= seuilVert) return 'bg-green-500';
    if (delai <= seuilJaune) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPosition = () => {
    const max = seuilRouge;
    const percentage = Math.min((delai / max) * 100, 100);
    return `${Math.max(0, percentage)}%`; // Ensure the position is within bounds
  };

  return (
    <div className="grid grid-cols-[10ch_1fr_15ch] items-center w-[80%]">
      <p className="mr-2 font-bold text-[20px]">Délai</p>
      <div className="relative flex-1 h-[50px] bg-gray-300 rounded-lg overflow-hidden">
        <div className="absolute top-0 left-0 h-[50px]" style={{ width: '50%', backgroundColor: 'green' }}></div>
        <div className="absolute top-0 left-1/2 h-[50px]" style={{ width: '25%', backgroundColor: 'yellow' }}></div>
        <div className="absolute top-0 left-3/4 h-[50px]" style={{ width: '25%', backgroundColor: 'red' }}></div>

        <div
          className="absolute top-0 w-full transform -translate-y-1/2 group"
          style={{ left: getPosition() }}
        >
          <BiSolidDownArrow className="text-5xl text-black" />
          <p className="text-lg absolute bg-none text-black font-bold opacity-0 group-hover:opacity-100">
            {delai} jours
          </p>
        </div>
      </div>
      <p className="ml-2 text-[20px] text-green-700 font-bold">{seuil.toLocaleString()} jours</p>
    </div>
  );
};



