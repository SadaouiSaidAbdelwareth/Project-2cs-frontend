  import React, { useState } from 'react'
  import  logo from "../../assets/logoSonatrac.png"
  import { BiCalendar } from "react-icons/bi";
  import { CiLogout } from "react-icons/ci";

  const SettingsPhase = () => {


    type Phase = {
      id: number;
      name: string;
      real_cout: number;
      starting_date: string;
      estimated_ending_date: string;
      estimated_cout: number;
      depth?: number;
      estimated_depth?: number;
      sondage?: Sondage;
    };

    type Sondage = {
      id: number;
      endroit: string;
      started_date: string;
      estimated_cout: number;
      real_cout: number;
      days_estimated: string;
      depth?: number;
      but: string;
      phases?: Phase[];
      days?: string;
    };

    // Sondage de test avec plusieurs phases
    const [sondage, setSondage] = useState<Sondage | undefined>({
      id: 1,
      endroit: "Site A",
      started_date: "2024-06-01",
      estimated_cout: 50000,
      real_cout: 48000,
      days_estimated: "30",
      but: "Étude géotechnique",
      phases: [
        {
          id: 1,
          name: "Préparation",
          real_cout: 10000,
          starting_date: "2024-06-01",
          estimated_ending_date: "2024-06-05",
          estimated_cout: 12000,
          depth: 10,
          estimated_depth: 12,
        },
        {
          id: 2,
          name: "Forage",
          real_cout: 25000,
          starting_date: "2024-06-06",
          estimated_ending_date: "2024-06-20",
          estimated_cout: 26000,
          depth: 50,
          estimated_depth: 55,
        },
        {
          id: 3,
          name: "Analyse",
          real_cout: 13000,
          starting_date: "2024-06-21",
          estimated_ending_date: "2024-06-30",
          estimated_cout: 12000,
        },
      ],
      days: "30",
    });

    const [activeTab,setActiveTab] = useState('phases')


    return (
      <div className=' mt-[85px] w-screen flex ' >
        <div className=' w-[247px] bg-[#F3F3F3] h-screen fixed flex flex-col space-y-20 items-center pt-3 '>
        <img src={logo} alt="" className='  size-[73px] ' />

        <div className="flex flex-col">
          <button
            onClick={() => setActiveTab("phases")}
            className={`rounded-md px-6 py-2 font-medium mb-4 w-[120px] ${
          activeTab === "phases"
            ? "bg-[#6FBAEE] text-white"
            : "bg-transparent text-black"
            }`}
          >
            Phases
          </button>
          <button
            onClick={() => setActiveTab("operations")}
            className={`rounded-md px-6 py-2 font-medium mb-4 w-[120px] ${
          activeTab === "operations"
            ? "bg-[#6FBAEE] text-white"
            : "bg-transparent text-black"
            }`}
          >
            Operations
          </button>
        </div>

        <div className=' cursor-pointer absolute bottom-20 text-[24px] font-semibold flex items-center space-x-1.5 text-red-600 '> <CiLogout /> <p>Logout</p> </div>

        
        
          <p className=' absolute bottom-0 font-medium text-[16px] text-black pb-[100px] '>© DevEdge 2025</p> 

        
        </div>

        {activeTab === "phases" && (
          <div className="ml-[300px] mt-10  flex flex-col space-y-20 items-center px-14  "> 
          <p className=' text-[24px] text-[#8C52FF] font-bold '> Paramètres de performance </p>


            <div className=' flex flex-col space-y-4 w-[90%]    '> 
            {sondage?.phases?.map((phase, idx) => (
              <div key={phase.id} className="mb-8 flex justify-between  ">
                <div className="flex flex-col space-y-3 mb-1">
                  <span className="text-[#6CB6F7] text-lg font-bold cursor-default">
                    Phase {idx + 1} ({phase.estimated_ending_date?.slice(8, 10) || "0"}’)
                  </span>
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Coût</label>
                    <div className=" relative flex items-center">
                      <input
                        className="bg-[#F6F8FB] rounded-md px-4 py-2 w-[180px] outline-none"
                        type=""
                        value={phase.real_cout || ""}
                        readOnly
                        disabled
                      />
                      <span className="absolute right-5  ml-2 text-[#A6D3F7] text-lg font-bold">$</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                
                  <div>
                    <label className="block text-gray-500 text-[20px] mb-1">Délai</label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 font-semibold text-sm">From</span>
                      <div className="relative">
                        <input
                        className="bg-[#F6F8FB] rounded-md px-4 py-2 pr-10 outline-none"
                        type="date"
                        value={phase.starting_date || ""}
                        readOnly
                        disabled
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6CB6F7] pointer-events-none">
                        <BiCalendar size={20} />
                        </span>
                      </div>
                      <span className="text-gray-400 font-semibold text-sm">to</span>
                      <div className="relative">
                        <input
                        className="bg-[#F6F8FB] rounded-md px-4 py-2 pr-10 outline-none"
                        type="date"
                        value={phase.estimated_ending_date || ""}
                        readOnly
                        disabled
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6CB6F7] pointer-events-none">
                        <BiCalendar size={20} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>


          </div>
        )}




        </div>
        
    )
  }

  export default SettingsPhase
