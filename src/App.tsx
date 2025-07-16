import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./features/manager/Accueil";
import SondageForm from "./features/manager/SondageForm";
import PhaseDash from "./features/manager/PhaseDash";
import PhaseOp from "./features/manager/PhaseOp";
import Operations from "./features/manager/Operations";
import DayCost from "./features/manager/DayCost";
import SettingsPhase from "./features/manager/SettingsPhase";
import SettingsOp from "./features/manager/SettingsOp";
import Excelimport from "./features/engineer/Excelimport";
import ProblemForm from "./features/engineer/ProblemForm";
import DayProbEng from "./features/engineer/DayProbEng";
import SignIn from "./features/SignIn";
import { SondageList } from "./features/manager/SondageList";
import ManagerLayout from "./features/manager/components/ManagerLayout ";
import SideBarLayout from "./features/manager/components/SideBarLayout";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SupabaseTest } from "./features/supabaseTest";

export default function App() { 
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function checkUser() { 
      const token = Cookies.get("token");
      const userType = Cookies.get("user_type");
      
      if (!token) { 
        setRole(null);
        console.log('token is null')
        return;
      }
      try {
        /*
        const res = await fetch("/check_user/", {
          method: "POST",
          headers: {
        "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ token : token })
        });
        const data = await res.json();
        */
        if ( userType) {  
          setRole(userType);
        } else {
          setRole(null);
        }
      } catch {
        setRole(null);
      }
    }
    checkUser();
  }, []);

  return (  
    <BrowserRouter>
      <Routes>
        {role === null &&       <Route path="/" element={ <SignIn /> } />  } 

        {/* Manager routes */}
        {role === "Manager" && ( 
          <>
            <Route path="/" element={<SondageList />} />
            <Route path="/sondageForm" element={<SondageForm />} />
            
            <Route element={<ManagerLayout/>} >
            <Route path="/accueil/:sondageId" element={<Accueil />} /> 
            <Route  element={<SideBarLayout/>} >
            
            <Route path="/phases/:phaseId/dashboard" element={<PhaseDash />} />
            <Route path="/phases/:phaseId/operations" element={<PhaseOp />} />  
          
            </Route>                         


          
            <Route path="/operations" element={<Operations />} />
            <Route path="/days/:dayId/remarques" element={<DayCost />} />
            <Route path="/days/:dayId/cost" element={<DayCost />} />
            <Route path="/days/:dayId/problems" element={<DayCost />} />
            <Route path="/days/:dayId/excel" element={<DayCost />} />
            <Route path="/settingsPhase" element={<SettingsPhase />} />
            <Route path="settingsOp" element={<SettingsOp />} />

            
          </Route>

          
                  
         
           


          </>
          

        )}

        {/* Engineer routes */}
        {role === "Ingenieur" && (  

          <>  
          <Route path="/" element={<Excelimport />} />
          <Route path="/alldays/:dayId/problemForm" element={<ProblemForm />} />
          <Route path="/alldays/:dayId/dayProbEng" element={<DayProbEng />} />

          </>

        )} 

       
      </Routes>
    </BrowserRouter>
  );
}



// auth.ts
export function getUserRole() {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user.role;
  } catch {
    return null;
  }
}
