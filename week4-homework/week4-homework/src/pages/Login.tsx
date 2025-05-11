import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await signin({ loginId, password });

      if (response.success && response.data) {
        localStorage.setItem("userId", String(response.data.userId));
        navigate("/mypage");
      } else {
        setError(response.message || "로그인에 실패했습니다.");
      }
    } catch (err) {
      console.error("로그인 에러:", err);
      setError("서버 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg ">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>

        <input
          type="text"
          placeholder="아이디"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={!loginId || !password}
          className="w-full bg-blue-500 text-white py-2 rounded-md mb-3 disabled:opacity-50"
        >
          로그인
        </button>

        <button
          className="w-full text-sm text-blue-500 hover:underline"
          onClick={() => navigate("/signup")}
        >
          계정이 없으신가요? 회원가입하기
        </button>
      </div>
    </div>
  );
}

export default Login;
