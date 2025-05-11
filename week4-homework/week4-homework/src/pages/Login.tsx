import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>

        <input
          type="text"
          placeholder="아이디"
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded-md mb-3">
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
