import axios from 'axios';

// 어떤 에러든 사용자에게 보여줄 문장으로 바꾼다
export const getErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // 서버가 { code, message } 를 줌
      return (
        error.response.data?.message ??
        `오류가 발생했습니다 (${error.response.status})`
      );
    }
    if (error.code === 'ECONNABORTED') {
      return '서버 응답이 너무 느립니다';
    }
    return '서버에 연결할 수 없습니다';
  }
  return '알 수 없는 오류가 발생했습니다';
};
