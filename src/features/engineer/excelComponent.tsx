import { FC } from 'react';
import download from './assets/Vector.svg';
import './engineer.css';
import { useNavigate } from 'react-router-dom';

type ExcelComponentProps = {
  key:number
  excelDay: string;
  excelDate: string;
  file: string; // c'est maintenant une URL
  filename?: string;
};

const ExcelComponent: FC<ExcelComponentProps> = ({key, excelDay, excelDate, file, filename }) => {
  const handleDownload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    try {
      const response = await fetch(file);
      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', filename || 'rapport.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier :', error);
      alert("Erreur lors du téléchargement du fichier.");
    }
  };
  const navigate= useNavigate()

  return (
    <div className="card">
      <div className="exceltitle cursor-pointer" onClick={()=>{navigate(`/days/${key}/dayProbEng`) }}>
        <span id="excelDay">{excelDay}</span>
        <span id="excelDate">{excelDate}</span>
      </div>
      <div className="btndiv">
        <button className="downloadbtn" onClick={handleDownload}>
          <img id="download" src={download} alt="download" />
        </button>
      </div>
    </div>
  );
};

export default ExcelComponent;
