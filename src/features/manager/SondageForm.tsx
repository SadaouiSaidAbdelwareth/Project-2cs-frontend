import React, { useEffect, useState } from "react";
import axios from "axios";
import { addSondage } from "../../services/sondageServices";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

const SondageForm = () => {
  const [formData, setFormData] = useState({
    endroit: "",
    started_date: "",
    estimated_cout: 0,
    days_estimated: '',
    but: "",
  });

  const [phases,setPhases]=useState<{phase_name:string,cout:number,starting_date:Date,ending_date:Date,estimated_depth:number}[]>([])
  const [operations,setOperations]=useState<{operation_name:string,cout:number}[]>([])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,  
    }));
  };

  const [formNumber,setFormNumber] = useState(1)
  const navigate = useNavigate()   

  const [load,setLoad]=useState(false)
  const [msg,setMsg]=useState('')
  const [msgVisible,setMsgVisible]=useState(false) 


  

  useEffect(() => {
  if (formNumber === 2 && phases.length === 0) { 
    setPhases([
      {
        phase_name: '',
        cout: 0,
        starting_date: undefined as unknown as Date,
        ending_date: undefined as unknown as Date,
        estimated_depth:0
      },
    ]);
  }
  if (formNumber === 3 && operations.length === 0) {
    setOperations([{
      operation_name: '',
      cout: 0,
    }]);
  }

}, [formNumber, phases.length]);



  

  return (
    <div className="relative flex flex-col justify-center items-center w-screen h-screen bg-white">
      <h2 className="absolute top-5 text-center text-[24px] text-[#8C52FF] font-semibold mb-6">
        Veuillez remplir ce formulaire pour créer un sondage 
      </h2>
      <IoArrowBackSharp onClick={()=>{navigate(-1 )}}  className=' absolute top-6 left-6 text-3xl cursor-pointer text-white bg-[#6FBAEE] rounded-full text-5xl p-2'   />
       



      <div className=" w-3/4 md:w-1/2 lg:w-1/3 p-8 rounded-lg shadow-2xl">

      { formNumber===1 &&  (
        <form className=" max-h-120">
         <div>
            <label className="block text-[var(--color-secondary)] font-medium mb-2">Endroit</label>
            <input
              type="text"
              name="endroit"
              value={formData.endroit}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-[var(--color-secondary)] font-medium mb-2">Date</label>
            <input
              type="date"
              name="started_date"
              value={formData.started_date}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-[var(--color-secondary)] font-medium mb-2">Cout</label>
            <input
              type="number"
              name="estimated_cout"
              value={formData.estimated_cout}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-[var(--color-secondary)] font-medium mb-2">Delai</label>
            <input
              type="date"
              name="days_estimated"
              value={formData.days_estimated}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-[var(--color-secondary)] font-medium mb-2">But</label>
            <input
              type="string"
              name="but"
              value={formData.but}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
         
        </form>
      )
    }
      {formNumber === 2 && ( 
  <form className="flex flex-col max-h-120 overflow-y-auto">
    {/* Affichage des phases existantes */}
    {phases.map((phase, idx) => (
      <div key={idx} className="flex flex-col mb-4 border-b pb-4 relative">
        {/* Bouton de suppression */}
       

        <div>
          <label className="block text-[var(--color-secondary)] font-medium mb-2">
            Nom de la phase {idx + 1}
          </label>
          <input
            type="text"
            value={phase.phase_name}
            onChange={e => {
              const newPhases = [...phases];
              newPhases[idx].phase_name = e.target.value;
              setPhases(newPhases);
            }}
            className="w-full border border-blue-300 rounded-lg p-2 mb-2"
          />
        </div>
        <div>
          <label className="block text-[var(--color-secondary)] font-medium mb-2">Coût</label>
          <input
            type="number"
            value={phase.cout}
            onChange={e => {
              const newPhases = [...phases];
              newPhases[idx].cout = Number(e.target.value);
              setPhases(newPhases);
            }}
            className="w-full border border-blue-300 rounded-lg p-2 mb-2"
          />
        </div>
        <div>
          <label className="block text-[var(--color-secondary)] font-medium mb-2">Date de début</label>
          <input
            type="date"
            value={phase.starting_date ? new Date(phase.starting_date).toISOString().split('T')[0] : ''}
            onChange={e => {
              const newPhases = [...phases];
              newPhases[idx].starting_date = new Date(e.target.value);
              setPhases(newPhases);
            }}
            className="w-full border border-blue-300 rounded-lg p-2 mb-2"
          />
        </div>
        <div>
          <label className="block text-[var(--color-secondary)] font-medium mb-2">Date de fin</label>
          <input
            type="date"
            value={phase.ending_date ? new Date(phase.ending_date).toISOString().split('T')[0] : ''}
            onChange={e => {
              const newPhases = [...phases];
              newPhases[idx].ending_date = new Date(e.target.value);
              setPhases(newPhases);
            }}
            className="w-full border border-blue-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block text-[var(--color-secondary)] font-medium mb-2">estimated depth</label>
          <input
            type="number"
            value={phase.estimated_depth}
            onChange={e => {
              const newPhases = [...phases];
              newPhases[idx].estimated_depth = Number(e.target.value);
              setPhases(newPhases);
            }}
            className="w-full border border-blue-300 rounded-lg p-2 mb-2"
          />
        </div> 
          
         <button
          type="button"
          onClick={() => {
            const newPhases = phases.filter((_, i) => i !== idx);
            setPhases(newPhases);
          }}
          className=" self-end text-red-500 "
          title="Supprimer cette phase"
        >
          <MdDeleteForever size={20} />
        </button>  

        {/* Message d'erreur */}
        {(!phase.phase_name.trim() || !phase.cout || !phase.starting_date || !phase.ending_date) && (
          <div className="text-red-500 mt-2 text-sm">
            Veuillez remplir tous les champs de la phase {idx + 1}.
          </div>
        )}
      </div>
    ))}

    {/* Affichage du bouton + phase même si aucune phase n’existe */}

    <button
      type="button"
      onClick={() => { 
        const isEmptyFieldExists = phases.some(
          p => !p.phase_name.trim() || !p.cout || !p.starting_date || !p.ending_date
        );

        if (isEmptyFieldExists || phases.length >= 4) {
          return;
        }

        setPhases([
          ...phases,
          {
            phase_name: '',
            cout: 0,
            starting_date: undefined as unknown as Date,
            ending_date: undefined as unknown as Date,
            estimated_depth:0
          },
        ]); 
      }}
      disabled={phases.length >= 4}
      className="self-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
      + phase
    </button>
  </form>
)} 



      {formNumber === 3 && (
  <form className="flex flex-col max-h-120 overflow-y-auto">
    {/* Affichage des opérations existantes */}
    {operations.map((operation, idx) => (
      <div key={idx} className="flex flex-col mb-4 border-b pb-4 relative">
        <div>
          <label className="block text-[var(--color-secondary)] font-medium mb-2">
            Nom de l'opération {idx + 1}
          </label>
          <input
            type="text"
            value={operation.operation_name}
            onChange={e => {
              const newOperations = [...operations];
              newOperations[idx].operation_name = e.target.value;
              setOperations(newOperations);
            }}
            className="w-full border border-blue-300 rounded-lg p-2 mb-2"
          />
        </div>
        <div>
          <label className="block text-[var(--color-secondary)] font-medium mb-2">Coût</label>
          <input
            type="number"
            value={operation.cout}
            onChange={e => {
              const newOperations = [...operations];
              newOperations[idx].cout = Number(e.target.value);
              setOperations(newOperations);
            }}
            className="w-full border border-blue-300 rounded-lg p-2 mb-2"
          />
        </div>
       

        {/* Bouton de suppression */}
        <button
          type="button"
          onClick={() => {
            const newOperations = operations.filter((_, i) => i !== idx);
            setOperations(newOperations);
          }}
          className="self-end text-red-500"
          title="Supprimer cette opération"
        >
          <MdDeleteForever size={20} />
        </button>

        {/* Message d'erreur */}
        {(!operation.operation_name.trim() || !operation.cout) && (
          <div className="text-red-500 mt-2 text-sm">
            Veuillez remplir tous les champs de l'opération {idx + 1}.
          </div>
        )}
      </div>
    ))}

    {/* Bouton + opération */}
    <button
      type="button"
      onClick={() => {
        const isEmptyFieldExists = operations.some(
          o => !o.operation_name.trim() || !o.cout 
        );

        if (isEmptyFieldExists) {
          return;
        }

        setOperations([
          ...operations,
          {
            operation_name: '',
            cout: 0,
          },
        ]);
      }}
      className="self-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
      + opération
    </button>

   
  </form>
)}


       




        <div className=" relative flex justify-center items-center space-x-2">
          <button onClick={ ()=> setFormNumber(formNumber-1) } 
          disabled={formNumber<=1} 
          className= {`text-blue-500 ${formNumber <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-gray-500">{formNumber}/3</span>
          <button onClick={ ()=>{ 
           
             setFormNumber(formNumber+1)}

             } 

          disabled={formNumber>2}
          className={`text-blue-500 ${formNumber > 2 ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
               {msg && (
          <div
            className={` text-xl absolute top-0 left-1/2 w-full transform -translate-x-1/2 bg-white rounded-lg shadow-2xl text-black px-2 py-2 transition-all duration-500 ease-in-out opacity-100 ${
              msgVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
            }`}
          >
            {msg}
          </div>
        )}

        </div>
       


        <div className="flex space-x-4 items-center mt-6">
          <button className="bg-red-500 text-white px-4 w-1/2 py-2 rounded-lg hover:bg-red-600">
            Annuler
          </button>

          <button 
            type="button"
            className="bg-green-500 text-white px-4 w-1/2 py-2 rounded-lg hover:bg-green-600"
            onClick={async () => {
  setLoad(true);

  const bodySondage = {
    endroit: formData.endroit,
    started_date: formatDateToYYYYMMDD(formData.started_date),
    estimated_cout: Number(formData.estimated_cout),
    real_cout:0,
    days_estimated: formatDateToYYYYMMDD(formData.days_estimated),
    depth:0,
    but: formData.but,
  };

  // Créer un contrôleur pour l'annulation
  const controller = new AbortController();

  // Timeout manuel de 10 secondes
  const timeoutId = setTimeout(() => {
    controller.abort(); // annule la requête
  }, 1000000);

  try {
    const sondageResponse = await axios.post('/sondages/create/', bodySondage, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId); // si tout se passe bien, on annule le timeout

    if (sondageResponse.status === 200 || sondageResponse.status === 201) {
      
      const phasesFetch = await Promise.all(
        phases.map(async (phase) => {
          const bodyPhase = { 
            name: phase.phase_name,
            starting_date: formatDateToYYYYMMDD(phase.starting_date),
            estimated_ending_date: formatDateToYYYYMMDD(phase.ending_date),
            estimated_cout: Number(phase.cout),
            estimated_depth:phase.estimated_depth,
            sondage: sondageResponse.data.id,
          };
          try {
            const phaseResponse = await axios.post('/sondages/phases/create/', bodyPhase);
            return phaseResponse.status;
          } catch (error) {
            return null;
          }
        })
      );

      const operationsFetch = await Promise.all(
        operations.map(async (operation) => {
          const bodyOperation = {
            name: operation.operation_name,
            estimated_cout: operation.cout,
            sondage: sondageResponse.data.id,
          };
          try {
            const operationResponse = await axios.post('/sondages/operations/create/', bodyOperation);
            return operationResponse.status;
          } catch (error) {
            return null;
          }
        })
      );

      const allPhasesOk = phasesFetch.every((status) => status === 200 || status === 201);
      const allOperationsOk = operationsFetch.every((status) => status === 200 || status === 201);

      if (allPhasesOk && allOperationsOk) {
        setMsg('✅ Le sondage a été bien ajouté !');
      } else {
        setMsg('⚠️ Le sondage a été créé, mais certaines phases ou opérations ont échoué.');
      }
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      setMsg("❌ La requête a dépassé le délai de 10 secondes et a été annulée.");
    } else {
      setMsg("❌ Une erreur s'est produite lors de la création du sondage.");
    }
  } finally {
    setLoad(false); // Toujours arrêter le loading
    setMsgVisible(true);
setTimeout(() => {
  setMsgVisible(false);
  setTimeout(() => setMsg(""), 500);
}, 3500);
  }
}}

          >
            Sauvegarder
          </button>
        </div>

        {load? <div className=' absolute top-[50%] right-[50%] flex justify-center items-center'>
          <svg className="animate-spin h-8 w-8 text-[#6FBAEE]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
      </div> 
    :null}

    


      </div>
          
       <p className=" shadow-2xl bg-[#aa83f7]   cursor-pointer  mt-8 text-xl  text-black px-4  py-2 rounded-lg "
       onClick={ async ()=> {
        try {
          setLoad(true)
            const response= await axios.post( '/insert_all_data/' )
            if (!response.status) setMsg('la creation des donnes  est echouer')   
              else {setMsg('les donnes sont creer avec succes')
            await new Promise(resolve => setTimeout(resolve, 3500)); 
            navigate('/sondageList') }  
            
        }
        catch(error){ 
          
          setMsg('une erreur lors de la creation des donnes ') 
          
        }
        finally { 
          setLoad(false)
          setMsgVisible(true);
          setTimeout(() => {
            setMsgVisible(false);
            setTimeout(() => setMsg(""), 500);
          }, 3500);
          
        }
      
       } }  
       >
              creation de donnes automatiques 
        </p>

         

    </div>
  );
};

export default SondageForm;


export function formatDateToYYYYMMDD(date:string|Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
