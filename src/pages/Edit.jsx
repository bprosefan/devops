import { useNavigate, useParams } from 'react-router-dom';
import useDiary from '../hooks/useDiary';
import Header from '../component/Header';
import Button from '../component/Button';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';
import Editor from '../component/Editor';

const Edit = () => {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const onSubmit = (data) => {
    if (window.confirm('혼또리 수정데스까?')) {
      const { date, content, emotionId } = data;
      onUpdate(id, date, content, emotionId);
      navigate('/', { replace: true });
    }
  };

  const onClickDelete = () => {
    if (window.confirm('혼또리 일기 삭제 데스까?')) {
      onDelete(id);
      navigate('/', { replace: true });
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (!data) {
    return <div>일기 불럴오고 있당께??</div>;
  } else {
    return (
      <div>
        <Header
          title={'일기 수정하기'}
          leftChild={<Button text={'<뒤로가기'} onClick={goBack} />}
          rightChild={
            <Button type={navigate} text={'삭제하기'} onClick={onClickDelete} />
          }
        />
        <Editor initData={data} onSubmit={onSubmit} />
      </div>
    );
  }
};

export default Edit;
