import { useContext } from 'react';
import { DiaryStateContext } from '../App';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useDiary = (id) => {
  const data = useContext(DiaryStateContext);
  const [diary, setDiary] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const matchDiary = data.find((it) => String(it.id) === String(id));
    if (matchDiary) {
      setDiary(matchDiary);
    } else {
      alert('일기가 없당께요?');
      navigate('/', { replace: true });
    }
  }, [id]);

  return diary;
};

export default useDiary;
