import { useState } from 'react';
import './Editor.css';
import { emotionList, getFormattedDate } from '../util';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import EmotionItem from './EmotionItem';
import { useEffect, useCallback } from 'react';

const Editor = ({ initData, onSubmit }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    date: getFormattedDate(new Date()),
    emotionId: 3,
    content: '',
  });
  const handleChangeDate = (e) => {
    setState({ ...state, date: e.target.value });
  };
  const handleChangeContext = (e) => {
    setState({
      ...state,
      content: e.target.value,
    });
  };
  const handleSubmit = () => {
    onSubmit(state);
  };
  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChangeEmotion = useCallback((emotionId) => {
    setState((state) => ({
      ...state,
      emotionId,
    }));
  }, []);

  useEffect(() => {
    if (initData) {
      setState({
        ...initData,
        date: getFormattedDate(new Date(parseInt(initData.date))),
      });
    }
  }, [initData]);
  return (
    <div className="Editor">
      <div className="editor_section">
        {/*날짜*/}
        <h4>오늘의 날짜</h4>
        <div className="input_wrapper">
          <input type="date" value={state.date} onChange={handleChangeDate} />
        </div>
      </div>
      <div className="deitor_section">
        {/*감정*/}
        <h4>오늘의 감정</h4>
        <div className="input_wrapper emotion_list_wrapper">
          {emotionList.map((it) => (
            <EmotionItem
              key={it.id}
              {...it}
              onClick={handleChangeEmotion}
              isSelected={state.emotionId === it.id}
            />
          ))}
        </div>
      </div>
      <div className="deitor_section">
        {/*일기*/}
        <h4>오늘의 일기</h4>
        <div className="input_wrapper">
          <textarea
            placeholder="세상 사람 다 힘들어 그만 징징대"
            value={state.content}
            onChange={handleChangeContext}
          />
        </div>
      </div>
      <div className="deitor_section bottom_section">
        <Button text={'취소하기'} onClick={handleGoBack} />
        <Button text={'작성 완료'} type="positive" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Editor;
