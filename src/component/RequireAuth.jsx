import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../api/token';

const RequireAuth = ({ children }) => {
  if (!getAccessToken()) {
    return <Navigate to="/login" replace />; // 토큰 없으면 로그인으로
  }
  return children; // 있으면 원래 페이지
};

export default RequireAuth;
