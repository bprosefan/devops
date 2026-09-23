import axiosInstance from './axiosInstance';

// 목록: 기간(from~to) + 정렬 → 일기 배열
export const getDiaries = async (from, to, sort = 'latest') => {
  const { data } = await axiosInstance.get('/api/diaries', {
    params: { from, to, sort },
  });
  return data.items; // { items: [...], total } 중 items 만
};

// 작성: diary = { date(ms 숫자), content, emotionId } → 생성된 일기
export const createDiary = async (diary) => {
  const { data } = await axiosInstance.post('/api/diaries', diary);
  return data;
};

// ---------- 아래 3개는 Part B 에서 직접 작성 ----------

// 단건 조회: GET /api/diaries/{id}  → 일기 1건
// export const getDiary = async (id) => { ... };

// 수정: PUT /api/diaries/{id} + { date, content, emotionId } → 수정된 일기
// export const updateDiary = async (id, diary) => { ... };

// 삭제: DELETE /api/diaries/{id} → 응답 본문 없음 (204)
// export const deleteDiary = async (id) => { ... };
