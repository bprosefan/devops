import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { getEmotionImgById } from './util';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import New from './pages/New';
import { useReducer } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import RequireAuth from './component/RequireAuth';
import { useState } from 'react';
import Login from './pages/Login';
import React from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      return [action.data, ...state];
    }
    case 'UPDATE': {
      return state.map((it) =>
        String(it.id) === String(action.data.id) ? { ...action.data } : it,
      );
    }
    case 'DELETE': {
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    default: {
      return state;
    }
  }
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const mockData = [
  {
    id: 'mock1',
    date: new Date().getTime() - 1,
    content: 'mock1',
    emotionId: 1,
  },
  {
    id: 'mock2',
    date: new Date().getTime() - 2,
    content: 'mock2',
    emotionId: 3,
  },
  {
    id: 'mock3',
    date: new Date().getTime() - 3,
    content: 'mock3',
    emotionId: 3,
  },
];

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  useEffect(() => {
    dispatch({
      type: 'INIT',
      data: mockData,
    });
    setIsDataLoaded(true);
  }, []);

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId,
    });
  };

  if (!isDataLoaded) {
    return <div>데이터 불러오고 있당께 좀만 기다리쇼잉~</div>;
  } else {
    return (
      <>
        <DiaryStateContext.Provider value={data}>
          <DiaryDispatchContext.Provider
            value={{
              onCreate,
              onUpdate,
              onDelete,
            }}
          >
            <div className="App">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/new"
                  element={
                    <RequireAuth>
                      <New />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/diary/:id"
                  element={
                    <RequireAuth>
                      <Diary />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/edit/:id"
                  element={
                    <RequireAuth>
                      <Edit />
                    </RequireAuth>
                  }
                />
              </Routes>
            </div>
          </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
      </>
    );
  }
}

export default App;
