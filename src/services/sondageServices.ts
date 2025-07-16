import axios from "axios";
import { Sondage } from "../types/sondage";

export const fetchSondages = async ():Promise<Sondage[]> => { 
    try {
     // const response =await fetch('/sondages/');
     // let data:Sondage[] = await response.json();
    
  
      // return fake list of sondage
      return [
        {
          id: 1,
          endroit: "Alger",
          started_date: "2024-06-01",
          estimated_cout: 10000,
          real_cout: 9500,
          days_estimated: "2024-06-10",
          depth: 50,
          but: "Étude géologique",
          phases: [1, 2],
          days: "9"
        },
        {
          id: 2,
          endroit: "Oran",
          started_date: "2024-05-15",
          estimated_cout: 8000,
          real_cout: 8200,
          days_estimated: "2024-05-20",
          but: "Recherche d'eau",
          phases: [3],
          days: "5"
        }
      ] as Sondage[];
    } catch (error) {
      console.error('Error fetching sondages:', error);
      throw error;
    }

} 

export const  fetchSondage = async (id: number): Promise<Sondage> => { 
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try { 
    const response = await fetch(`/sondages/${id}`, { signal: controller.signal });
    clearTimeout(timeout);  

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw {
        name: "HttpError",
        status: response.status,
        message: body?.message || `Erreur HTTP ${response.status}`,
      };
    }   

    const data: Sondage = await response.json();
    return data;


  } catch (error: any) {
    clearTimeout(timeout);

    if (error.name === "AbortError") {
      throw { name: "TimeoutError", message: "⏱️ La requête a expiré après 6 secondes." };
    }

    if (error.name === "HttpError") {
      throw error;
    }

    throw { name: "NetworkError", message: "📡 Erreur réseau ou serveur injoignable.", originalError: error };
  }
};


export const addSondage = async (sondage:Sondage) => {
    try {
      const response = await axios.post("https://your-endpoint.com/api/sondages", sondage);
      console.log("Sondage ajouté avec succès :", response.data);
      alert("Sondage ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du sondage :", error);
      alert("Erreur lors de l'ajout du sondage.");
    }
  };




