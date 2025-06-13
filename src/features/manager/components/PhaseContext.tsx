import { createContext, useContext } from "react";
import { Phase } from "./SideBarLayout";

// 1. Crée le contexte UNE SEULE FOIS
export const PhaseContext = createContext<Phase[]>([]);

// 2. Crée un hook utilitaire pour l'utiliser facilement
export function usePhase() {          
  return useContext(PhaseContext);
}    



