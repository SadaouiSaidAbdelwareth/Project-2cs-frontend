
import './engineer.css';
import { useState } from 'react';


const ProbComponent = ({ description, degre }: { description: string; degre: number }) => {

    const [showModal, setShowModal] = useState(false);
    const [problemdegre, setProblemdegre] = useState(
        degre === 3 ? 'High degree' : degre === 2 ? 'Medium degree' : 'Low degree'
    );  const [problemDescription, setProblemDescription] = useState(description);

    return (
        <>
        <div className='problem'>
                <span 
                    className=' text-red-700 font-bold text-xl'
                >
                    {problemdegre}
                </span>
            <div className='probdescdiv' onClick={() => setShowModal(true)}>
                <span className='problemdescription'>{problemDescription}</span>
            </div>
        </div>

         {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Description complète</h3>
            <p>{problemDescription}</p>
            <button onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        </div>
      )}
     </>
    );
};

export default ProbComponent;
