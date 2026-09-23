import axiosInstance from './axiosInstance';

// 로그인 → { accessToken, refreshToken, tokenType, accessTokenExpiresIn }
export const login = async (email, password) => {
  const { data } = await axiosInstance.post('/api/auth/login', {
    email,
    password,
  });
  return data;
};
