import './engineer.css'
import back from './assets/back.svg'
import ProbComponent from './probComponent'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
const DayProbEng = () => {
const [fetchProblems, setFetchProblems] = useState<{ id: number,
      title: string,
      description: string,
      degre: number}[]>([]);
const{dayId} = useParams();
const [dateDay,setDateDay]=useState('')


useEffect( () => {
    fetchlistproblems().then((problems) => setFetchProblems(problems))
    .catch ( (error)=>  {console.error('Error fetching problems:', error);} )
    fetchDayInfo().then((date)=>setDateDay(date))
    

  },[dayId])

const fetchlistproblems = async () => {
  const response = await fetch(`/days/problems/${dayId}/`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  console.log(data.problems);

  return data || [];
};

const fetchDayInfo = async () => {
  const response = await fetch(`/days/${dayId}/`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
 

  return data.date || [];
};

 

const navigate=useNavigate() 


return (
    <div className='dayProbContainer'>
      <div className='dayProbBar'>
        <button 
          className='' 
          onClick={() => window.location.href = '/'}
        >
          <IoMdArrowBack size={23} />
        </button>
        <button 
          className='addProbbtn' 
          onClick={() => navigate(`/alldays/${dayId}/problemForm`)}
        >
          + Ajouter un problème
        </button>
      </div>
      <div className='dayProbTitle'>
         <span>Day {dayId}</span>
      <span>{dateDay}</span>
      </div>
      <div className='dayProbInstruct'>
         <span>Liste des problèmes</span>
      </div>
      <div className='probs'>
        { fetchProblems.map((problem) => {
          let degre = '';
          switch (problem.degre) {
        case 1:
          degre = 'low';
          break;
        case 2:
          degre = 'medium';
          break;
        case 3:
          degre = 'high';
          break;
        default:
          degre = 'unknown';
          }

          return (
        <ProbComponent 
          key={problem.id}
          description={problem.description}
          degre={problem.degre}
        />
          );
        })}
      </div>
    </div>
  )
}

export default DayProbEng
