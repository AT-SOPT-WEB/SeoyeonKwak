declare interface SignupRequest {
  loginId: string;
  password: string;
  nickname: string;
}

declare interface SignupResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    userId: number;
    nickname: string;
  };
}

declare interface SigninRequest {
  loginId: string;
  password: string;
}

declare interface SigninResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    userId: number;
  } | null;
}

declare interface GetMyProfileResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    nickname: string;
  };
}

declare interface SearchNicknameResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    nicknameList: string[];
  };
}

declare interface UpdateNicknameRequest {
  nickname: string;
}

declare interface UpdateNicknameResponse {
  success: boolean;
  code: string;
  message: string;
  data: null;
}
