import { useState, useRef, ChangeEvent, useEffect } from 'react';
import logout from './assets/logout.svg';
import notification from './assets/notification.svg';
import './engineer.css';
import ExcelComponent from './excelComponent';
import axios from 'axios';
import { useSondageStore } from '../manager/store/sondageStore';

type Repport = {
  id: number;
  excel_path: string;
  drive_file_id: string;
};

type Day = {
  id: number;
  date: string;
  phase?: number | null;
  repport: Repport;
};

const ExcelImport = () => {
  const [showModal, setShowModal] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Day[]>([]);
  const [fileAddedMsg, setFileAddedMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sondageId = useSondageStore((state) => state.sondageId);

  const fetchAllDays = async () => {
    const response = await fetch(`/sondages/${sondageId}/days/`);
    const data = await response.json();
    return data;
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('excel_file ', file);

    try {
      const response = await axios.post(`/days/create/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setFileAddedMsg('✅ Excel ajouté avec succès !');
      } else {
        setFileAddedMsg('⚠️ Échec de l’ajout du fichier.');
      }
    } catch (error) {
      console.log(error)
      setFileAddedMsg('❌ Erreur lors de l’ajout du fichier.');
    } finally {
      setShowModal(false);
      setTimeout(() => {
        setFileAddedMsg('');
      }, 5000); // Effacer après 5 sec
    }
  };

  useEffect(() => {
    fetchAllDays().then((data) => setUploadedFiles(data));
  }, [fileAddedMsg]);

  return (
    <div className="container">
      <div className="engineernav">
        <button className="bg-white">
          <img className="size-6" src={notification} alt="notification" />
        </button>
        <button className="logbtn">
          <img id="logout" src={logout} alt="Logout" /> Logout
        </button>
      </div>

      <div className="titlediv">
        <span id="importtitle">Rapports Excel</span>
        <button id="importbtn" onClick={() => fileInputRef.current?.click()}>
          + Importer Excel
        </button>
        <input
          type="file"
          accept=".xlsx,.xls"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>

      {fileAddedMsg && (
        <div className="fixed top-4 right-4 bg-white text-black px-4 py-2 rounded shadow-lg transition-opacity duration-500 animate-fade-in-out z-50">
          {fileAddedMsg}
        </div>
      )}

      <div className="exceldiv">
        {uploadedFiles.map((file, index) => (
          <ExcelComponent
            key={file.id}
            excelDay={String(file.id)}
            excelDate={file.date}
            file={file.repport.excel_path}
            filename={`rapport-${file.id}.xlsx`}
          />
        ))}
      </div>
    </div>
  );
};

export default ExcelImport;
