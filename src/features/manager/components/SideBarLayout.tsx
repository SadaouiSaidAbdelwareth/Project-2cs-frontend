import { Outlet, useParams } from "react-router-dom";
import Side_Bar from "./Side_Bar_phases";
import { useEffect, useState } from "react";
import { PhaseContext } from "./PhaseContext";
import { useSondageStore } from "../store/sondageStore";
import { Phase } from "../../../types/sondage";

export type Problem = {
  id: number;
  title: string;
  description: string;
  degre: number;
};

export type Phase2 = { 
  id: number;
  name: string;
  cout: number;
  estimated_cout: number;
  estimated_days: number;
  days: number;
  depth: number;
  problems: Problem[];
};


export default function SideBarLayout() {

  
  const [phases, setPhases] = useState<Phase[]>([])  

  const sondageId  = useSondageStore((state)=>state.sondageId); 



  
     useEffect( () => { 
      fetchPhases().then((data) => setPhases(data ?? [])); 
      
    } , []
    
    )  
  
    const fetchPhases = async ()   => {    
     try { 
      const response = await fetch (`/sondages/${sondageId}/phases/`)
      const data =await response.json() 
      return data.operations 
    } 
      catch (error) { 
        console.error('err fetching phases',error)
        throw error
      } 
    
  
    }  


    
       


  return (
    <PhaseContext.Provider  value={phases}>
      <div className=" w-[100%] "> 
        <Side_Bar />
        <Outlet  /> 
      </div>
      
    </PhaseContext.Provider>
  );
} 
