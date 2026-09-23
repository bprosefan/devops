import axios from 'axios';
import { getAccessToken, clearTokens } from './token';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // "http://localhost:8080" 또는 ""(배포)
  timeout: 5000,
});

// 요청 인터셉터: 모든 요청이 나가기 전에 실행
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 토큰이 있을 때만 헤더 추가
    }
    return config; // 반드시 config 를 반환해야 요청이 나간다
  },
  (error) => Promise.reject(error),
);

// 토큰 문제로 볼 서버 에러 코드
const TOKEN_ERROR_CODES = ['UNAUTHORIZED', 'EXPIRED_TOKEN', 'INVALID_TOKEN'];

// 응답 인터셉터: 응답이 컴포넌트에 도착하기 전에 실행
axiosInstance.interceptors.response.use(
  (response) => response, // 2xx 는 그대로 통과
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const code = error.response.data?.code;
      if (TOKEN_ERROR_CODES.includes(code)) {
        clearTokens(); // 쓸모없는 토큰 제거
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'; // 컴포넌트 밖이라 useNavigate 를 못 쓴다 → 브라우저 이동
        }
      }
    }
    return Promise.reject(error); // 에러는 그대로 던져서 호출한 쪽 catch 도 동작하게
  },
);

export default axiosInstance;
