import {create} from 'zustand'
import { persist } from 'zustand/middleware';
import { Phase } from '../../../types/sondage';

type sondageStore = { 
    sondageId:string|null,
    setSondageId :(id:string) => void,
    phase:Phase[] | null,
    setPhase : (phase:Phase[]) => void 
}

export const useSondageStore = create<sondageStore>()( 
  persist(
    (set) => ({
      sondageId: null,
      setSondageId: (id: string) => set({ sondageId: id }),
      phase:null,
      setPhase: (phase:Phase[]) => set({phase:phase})
    }),
    {
      name: 'sondage-storage', // nom de la clé dans localStorage
    }
  )
); 



