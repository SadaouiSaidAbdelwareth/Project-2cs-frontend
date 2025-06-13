import axios from "axios";
import { Sondage } from "../types/sondage";

export const fetchSondages = async ():Promise<Sondage[]> => { 
    try {
      const response =await fetch('/sondages/');
      let data:Sondage[] = await response.json();
    
  
      return data
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




