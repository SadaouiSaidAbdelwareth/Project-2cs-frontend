import React, { useEffect, useState } from 'react'
import  logo from "../../assets/logoSonatrac.png"
import { CiBoxList } from "react-icons/ci";
import { RiAlertFill } from "react-icons/ri";
import { RiFileExcel2Line } from "react-icons/ri";
import { GoAlertFill } from "react-icons/go";
import { RxDownload } from "react-icons/rx";

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSondageStore } from './store/sondageStore';

type DayInfo = {
    id: number;
    date: string;
    cout: number;
    phase: number;
    problems: {
      id: number;
      title: string;
      description: string;
      degre: number;
    }[];
    repport: {
      id: number;
      excel_path: string;
    };
    remarques: {
      id: number;
      remarque: string;
    }[];
    couts: {
      operation_id: number;
      operation_name: string;
      cout: number;
    }[];
  };

    type Repport = {
    id: number;
    excel_path: string;
    drive_file_id:string 
  };

  type Day = {
    id: number;
    date: string;
    phase?: number | null;
    repport: Repport;
  };


const DayCost = () => {

  const {dayId} = useParams()



  const [dayInfo, setDayInfo] = useState<DayInfo>();

  const [menu,setMenu]=useState('info') //info , problems  , excel

  const [isCoutClicked,setIsCoutClicked] = useState(true)
  const [loaded,setLoaded] = useState(false)  


  const fetchDayInfo= async (id:number)=> { 
 const response = await fetch(`/days/${id}/`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json()
    setDayInfo(data)  
    setLoaded(true)
     
  }  
  

  useEffect( ()=> {     
    setIsCoutClicked(true) 
    setLoaded(false)
    fetchDayInfo(Number(dayId)) 
  
    
    if (location.pathname===`/days/${dayId}/cost` ) {setMenu('info')}

  }
  ,[dayId] 
 ) 

 const location = useLocation() 
 const navigate = useNavigate() 


 
  return (
    <div className=' flex mt-[85px] w-screen '>
      {navBarDay()} 

      <div className=' ml-[247px] px-8 w-full flex flex-col space-y-5   '>

        <div className=' w-full flex flex-col space-y-3.5'>
          <div className=' flex w-[55%] justify-between '>
            <div className='flex p-3 space-x-4 bg-[#F3F3F3] rounded-xl'>
              <div
              className={`p-1 rounded-lg cursor-pointer ${menu === 'info' ? 'bg-[#64D0EA]' : ''}`}
              onClick={() => {setMenu('info');navigate(`/days/${dayId}/cost`) }}
              > 
              <CiBoxList
                size={'28px'} 
                color={menu === 'info' ? 'white' : undefined}
              />
              </div>
              <div
              className={`p-1 rounded-lg cursor-pointer ${menu === 'problems' ? 'bg-[#64D0EA]' : ''}`}
              onClick={() => {setMenu('problems');navigate(`/days/${dayId}/problems`) }}
              >
              <RiAlertFill
                size={'28px'}
                color={menu === 'problems' ? 'white' : undefined}
              />
              </div>
              <div
              className={`p-1 rounded-lg cursor-pointer ${menu === 'excel' ? 'bg-[#64D0EA]' : ''}`}
              onClick={() => {setMenu('excel');navigate(`/days/${dayId}/excel`)}}
              >
              <RiFileExcel2Line
                size={'28px'}
                color={menu === 'excel' ? 'white' : undefined}
              />
              </div>
            </div>

            <div className=' bg-[#F3F3F3] text-[#6FBAEE] p-3 rounded-xl text-[24px] font-semibold '>
              {dayInfo?.date}
            </div>

          </div>
          <p className=' self-center font-semibold text-[#8C54FF] text-[24px] '>Rapport du jour {dayInfo?.id} (Phase {dayInfo?.phase})</p> 

        </div>



       { 
       location.pathname===`/days/${dayId}/cost` || location.pathname===`/days/${dayId}/remarques`  ? 
       <div className=' w-full flex flex-col space-y-12 items-center '>
       

        <div className="   p-2  flex items-center w-[270px] h-[50px] rounded-xl overflow-hidden" style={{ background: 'linear-gradient(90deg, #5CE1E6 0%, #6FBAEE 50%, #8C52FF 100%)' }}>
          <button 
            className={` flex-1  font-semibold text-[20px] transition-colors duration-200 ${
              isCoutClicked ? 'bg-white text-[#6FBAEE]' : 'bg-transparent text-white'
            }`}  
            onClick={() => {setIsCoutClicked(true) ;navigate(`/days/${dayId}/cost`) } }
            style={{ border: 'none', outline: 'none' }}
          >
            Coûts
          </button>
          <button
            className={` flex-1 font-semibold text-[20px] transition-colors duration-200 ${
              !isCoutClicked ? 'bg-white text-[#6FBAEE]' : 'bg-transparent text-white'
            }`}
            onClick={() => {setIsCoutClicked(false);navigate(`/days/${dayId}/remarques`)}}
            style={{ border: 'none', outline: 'none' }}
          >
            Remarques
          </button>
        </div>
    

          { 
          loaded===false ?  
        <div className='flex justify-center items-center'>
          <svg className="animate-spin h-8 w-8 text-[#6FBAEE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </div> 
        :
          
          location.pathname===`/days/${dayId}/cost` ?
          //affiche les cout de days
          
          <div className=' w-[50%] flex flex-col space-y-3  '>
            {dayInfo?.couts.map((cout) => (
              <div key={cout.operation_id} className="flex justify-between items-center text-[18px] font-medium">
                <span>{cout.operation_name}</span>
                <span className="font-bold">{cout.cout.toLocaleString('fr-FR')} $</span>
              </div>
            ))}
            <div className="flex justify-between items-center text-[18px] font-semibold mt-4">
              <span>Total</span>
              <span className="font-bold">
                {dayInfo?.couts.reduce((acc, curr) => acc + curr.cout, 0).toLocaleString('fr-FR')} $
              </span>
            </div>
          </div>
            
          : 
        
            
          //affiche la list de remarque

          <div className="w-[50%] flex flex-col space-y-4">
            {dayInfo?.remarques.length === 0 ? (
              <div className="text-center text-gray-400 text-lg">Aucune remarque pour ce jour.</div>
            ) : (
              dayInfo?.remarques.map((remarque) => (
                <div
            key={remarque.id}
            className="flex items-center bg-gradient-to-r from-[#6FBAEE] via-[#8C52FF] to-[#5CE1E6] rounded-xl p-4 shadow-md transition-transform hover:scale-[1.02]"
                >
            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4 shadow">
              <span className="text-[#8C52FF] font-bold text-xl">{remarque.id}</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-lg">{remarque.remarque}</p>
            </div>
                </div>
              ))
            )}
          </div>
    

          }

  

        </div> : 
        location.pathname===`/days/${dayId}/problems` ?
        <div className=' w-full flex flex-col space-y-12 items-center'>

           <div className=' flex items-center space-x-2'>
          <GoAlertFill size={'35px'} className=' text-[#FFCE31] ' />
          <p className=' text-[32px] text-[#FFCE31] font-bold  '> Problèmes essentiels</p>
          </div>

            { 
             dayInfo?.problems.length === 0 ? (
              <div className="text-center text-gray-400 text-lg">Aucun problem pour ce jour.</div>
            ) :
            <div className="grid w-[100%] grid-cols-2 gap-4 mt-4">
              {dayInfo?.problems
              .map((probleme) => (
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
            }
          

        </div> 
        
        :

        <div className='w-full flex flex-col space-y-6 items-center'>
  <p className='text-[30px] text-[#8C54FF] font-bold'>Version Excel</p>

  <div className="w-full flex justify-center">
    <iframe 
      src="https://drive.google.com/file/d/1HnWt3eqd4KWJhMmClzdYwX68TcgJUBzM/preview"
      title="Aperçu Excel"
      className="w-[80%] h-[600px] border rounded-lg shadow"
      style={{ background: 'white' }}
      allow="autoplay"
    />
  </div>

  <button
    onClick={() => {
      window.open(
        "https://drive.google.com/uc?export=download&id=1HnWt3eqd4KWJhMmClzdYwX68TcgJUBzM",
        "_blank"
      );
    }}
    className="flex items-center bg-[#8CD0F7] hover:bg-[#6FBAEE] text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow space-x-2"
    style={{ width: 'fit-content' }}
  >
    <span className="mr-2"><RxDownload /></span>
    <span>Télécharger</span>
  </button>
</div>


        

        
      } 


        
      </div>

    </div>
  )
}

export default DayCost






export const navBarDay = ()=> {
  const [idDayClicked,setIdDayClicked]=useState(1)
  const sondageId= useSondageStore((state)=> state.sondageId)
  

  const [days, setDays] = useState<Day[]>([ ]); 
  const [allDays, setallDays] = useState<Day[]>([ ]); 
  const [isDaysLoaded,setIsDaysLoaded] = useState(false)


   useEffect(() => {
    
    fetchDays()
      .then((data) => {
        setDays(data);
        setallDays(data);
        setIsDaysLoaded(true)
      })
      .catch((error) => { console.error('Error fetching all days of this sondage:', error); });
     
    

  }, [])
  

  const fetchDays = async ()=> {     
    const response = await fetch(`/sondages/${sondageId}/days/`)   
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json()
    return data

  }

  const navigate = useNavigate()


  return(
     <div className=' w-[247px] bg-[#F3F3F3] h-screen fixed flex flex-col items-center pt-3 '>
        <img onClick={()=> navigate(`/accueil/${sondageId}`) } src={logo} alt="" className=' cursor-pointer  size-[73px] ' />
        <div className=' mt-2'>
        <p className=' text-[24px] text-black font-bold '>Filtrez par phase</p>
        <select
          className=" cursor-pointer mt-2 mb-4 px-3 py-2 rounded-lg bg-[#6FBAEE] text-white font-semibold text-[18px] focus:outline-none"
          onChange={e => {
            const phase = Number(e.target.value);
            if (phase === 0) {
              setDays(allDays);
            } else {
              setDays(allDays.filter(day => day.phase === phase));
            }
          }}
        >
          <option value={0}>Toutes les phases</option>
          {[...new Set(allDays.map(day => day.phase).filter((phase): phase is number => phase !== null && phase !== undefined))].map(phase => (
            <option key={phase} value={phase}>
              Phase {phase}
            </option>
          ))}
        </select>
        </div>
         {isDaysLoaded ?

        <div
          className='days-list overflow-auto flex flex-col space-y-2 h-[50%] mt-12'
        >
          {days.map((day) => (
            <p
              key={day.id}
              onClick={() => {
          setIdDayClicked(day.id);
          navigate(`/days/${day.id}/cost`); 
              }}
              className={`text-[24px] font-semibold cursor-pointer p-2 ${
          idDayClicked === day.id
            ? 'bg-[#6FBAEE] rounded-xl text-white'
            : 'bg-none text-[#6FBAEE]'
              }`}
            >
              Day {day.id}
            </p>
          ))}
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
  )
}




