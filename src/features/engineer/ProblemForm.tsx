import axios from 'axios';
import logout from './assets/logout.svg';
import notification from './assets/notification.svg';
import './engineer.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProblemForm = () => {
  const { dayId } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    degre: '',
    degreValue: 0,
    day: 0,
  });

  const [dateDay, setDateDay] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAddProblem = async (e: React.FormEvent) => {
    e.preventDefault(); // empêche le rechargement de page
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    let degreValue = 0;
    switch (formData.degre) {
      case 'high':
        degreValue = 0;
        break;
      case 'medium':
        degreValue = 1;
        break;
      case 'low':
        degreValue = 2;
        break;
      default:
        console.warn('Invalid priority value');
    }

    const dataToSend = {
      title: formData.title,
      description: formData.description,
      degre: degreValue,
      day: dayId,
    };

    try {
      const response = await axios.post('/days/problems/create/', dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMsg('✅ Problème ajouté avec succès !');
        setFormData({ title: '', description: '', degre: '', degreValue: 0, day: 0 });
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg('⚠️ Erreur lors de l’ajout du problème.');
        setTimeout(() => setErrorMsg(''), 4000);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setErrorMsg('❌ Une erreur s\'est produite.');
      setTimeout(() => setErrorMsg(''), 4000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDayInfo().then((date) => setDateDay(date));
  }, [dayId]);

  const fetchDayInfo = async () => {
    const response = await fetch(`/days/${dayId}/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.date || '';
  };

  return (
    <div className='ProblemContainer'>
      <div className='engineernav'>
        <button className='bg-white'>
          <img id='notification' src={notification} alt='notification' />
        </button>
        <button className='logbtn'>
          <img id='logout' src={logout} alt='Logout' /> Logout
        </button>
      </div>
      <div className='problemtitlediv'>
        <span>Day {dayId}</span>
        <span>{dateDay}</span>
      </div>
      <div className='instructiondiv'>
        <span>Veuillez remplir ces infos</span>
      </div>

      <div className='problemformdiv'>
        <form onSubmit={handleAddProblem}>
          <div className='inputdiv'>
            <label htmlFor='title' id='title-label'>
              Title
            </label>
            <input type='text' id='title' value={formData.title} onChange={handleInputChange} />
          </div>
          <div className='inputdiv'>
            <label htmlFor='description' id='description-label'>
              Description
            </label>
            <input
              type='text'
              id='description'
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className='inputdiv'>
            <label htmlFor='priority' id='priority-label'>
              Priority
            </label>
            <select id='degre' value={formData.degre} onChange={handleInputChange}>
              <option value=''>-- Choisir --</option>
              <option value='high'>High</option>
              <option value='medium'>Medium</option>
              <option value='low'>Low</option>
            </select>
          </div>

          <div className='submitdiv'>
            <button id='annulerbtn' type='button'>
              Annuler
            </button>
            <button id='submitbtn' type='submit' disabled={loading}>
              {loading ? (
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 100 100'
                  preserveAspectRatio='xMidYMid'
                  className='spinner'
                >
                  <circle
                    cx='50'
                    cy='50'
                    fill='none'
                    stroke='#fff'
                    strokeWidth='10'
                    r='35'
                    strokeDasharray='164.93361431346415 56.97787143782138'
                  >
                    <animateTransform
                      attributeName='transform'
                      type='rotate'
                      repeatCount='indefinite'
                      dur='1s'
                      values='0 50 50;360 50 50'
                      keyTimes='0;1'
                    />
                  </circle>
                </svg>
              ) : (
                'Sauvegarder'
              )}
            </button>
          </div>
        </form>

        {successMsg && <div className='success-msg'>{successMsg}</div>}
        {errorMsg && <div className='error-msg'>{errorMsg}</div>}
      </div>
    </div>
  );
};

export default ProblemForm;
