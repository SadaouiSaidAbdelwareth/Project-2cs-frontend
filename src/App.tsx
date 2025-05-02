import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./features/manager/Accueil";
import SondageList from "./features/manager/SondageList";
import SondageForm from "./features/manager/SondageForm";
import PhaseDash from "./features/manager/PhaseDash";
import PhaseOp from "./features/manager/PhaseOp";
import Operations from "./features/manager/Operations";
import DayRem from "./features/manager/DayRem";
import DayCost from "./features/manager/DayCost";
import DayProb from "./features/manager/DayProb";
import DayExcel from "./features/manager/DayExcel";
import SettingsPhase from "./features/manager/SettingsPhase";
import SettingsOp from "./features/manager/SettingsOp";
import Excelimport from "./features/engineer/Excelimport";
import ProblemForm from "./features/engineer/ProblemForm";
import DayProbEng from "./features/engineer/DayProbEng";
import SignIn from "./features/SignIn";

export default function App() {
  const role = getUserRole();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <SignIn /> } />

        {/* Manager routes */}
        {role === "manager" && (
          <>
          <Route path="/sondageList" element={<SondageList />} />
          <Route path="/sondageForm" element={<SondageForm />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/phase/:phaseId/dashboard" element={<PhaseDash />} />
          <Route path="/phase/:phaseId/operations" element={<PhaseOp />} />
          <Route path="/operations/:operationId" element={<Operations />} />
          <Route path="/days/:dayId/remarques" element={<DayRem />} />
          <Route path="/days/:dayId/cost" element={<DayCost />} />
          <Route path="/days/:dayId/problems" element={<DayProb />} />
          <Route path="/days/:dayId/excel" element={<DayExcel />} />
          <Route path="/settingsPhase" element={<SettingsPhase />} />
          <Route path="settingsOp" element={<SettingsOp />} />


          </>
          

        )}

        {/* Engineer routes */}
        {role === "engineer" && (

          <>
          <Route path="/excel-import" element={<Excelimport />} />
          <Route path="/problemForm" element={<ProblemForm />} />
          <Route path="/dayProbEng" element={<DayProbEng />} />
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
