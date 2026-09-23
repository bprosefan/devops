import Button from '../component/Button';
import Header from '../component/Header';
import DiaryList from '../component/DiaryList';
import { useState, useEffect } from 'react';
import { getMonthRangeByDate } from '../util';
import { getDiaries } from '../api/diaryApi';
import { getErrorMessage } from '../api/error';

const Home = () => {
  const [pivotDate, setPivotDate] = useState(new Date());
  const [data, setData] = useState([]); // 이 달의 일기 목록 (서버에서 받음)
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };
  const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;

  // 월이 바뀔 때마다 서버에 다시 요청
  useEffect(() => {
    const load = async () => {
      const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
      try {
        const items = await getDiaries(beginTimeStamp, endTimeStamp);
        setData(items);
      } catch (error) {
        alert(getErrorMessage(error));
      }
    };
    load();
  }, [pivotDate]);

  return (
    <>
      <Header
        title={headerTitle}
        leftChild={<Button text={'<'} onClick={onDecreaseMonth} />}
        rightChild={<Button text={'>'} onClick={onIncreaseMonth} />}
      />
      <DiaryList data={data} />
    </>
  );
};
export default Home;
