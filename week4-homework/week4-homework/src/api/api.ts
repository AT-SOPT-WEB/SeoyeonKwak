import axios from "axios";

// 로그인
export const signin = async (
  payload: SigninRequest
): Promise<SigninResponse> => {
  const response = await axios.post<SigninResponse>(
    "/api/v1/auth/signin",
    payload
  );
  return response.data;
};

// 회원가입
export const signup = async (
  payload: SignupRequest
): Promise<SignupResponse> => {
  const response = await axios.post<SignupResponse>(
    "/api/v1/auth/signup",
    payload
  );
  return response.data;
};

// 내 닉네임 조회
export const getMyProfile = async (): Promise<GetMyProfileResponse> => {
  const response = await axios.get<GetMyProfileResponse>("/api/v1/users/me");
  return response.data;
};

// 닉네임 조회
export const searchNickname = async (
  keyword: string
): Promise<SearchNicknameResponse> => {
  const response = await axios.get<SearchNicknameResponse>(`/api/v1/users`, {
    params: { keyword },
  });
  return response.data;
};

// 닉네임 수정
export const updateNickname = async (
  payload: UpdateNicknameRequest
): Promise<UpdateNicknameResponse> => {
  const response = await axios.patch<UpdateNicknameResponse>(
    "/api/v1/users",
    payload
  );
  return response.data;
};
