import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    id: "",
    password: "",
    nickname: "",
  });
  const [idError, setIdError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // 아이디 에러 처리 (step 1일 때만)
    if (name === "id") {
      if (!value) {
        setIdError(""); // 비어있으면 에러 없음 (단순 비활성화로 처리)
      } else if (value.length > 20) {
        setIdError("아이디는 20자 이하로 입력해주세요.");
      } else {
        setIdError(""); // 문제 없음
      }
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // 최종 회원가입 처리
      console.log("회원가입 정보:", form);
      alert("회원가입 완료!");
      navigate("/login");
    }
  };

  // 버튼 활성 조건
  const isNextDisabled =
    (step === 1 && (!form.id || idError)) ||
    (step === 2 && !form.password) ||
    (step === 3 && !form.nickname);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>

        {step === 1 && (
          <>
            <input
              type="text"
              name="id"
              placeholder="아이디"
              value={form.id}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-1 border rounded-md"
            />
            {idError && <p className="text-red-500 text-sm mb-3">{idError}</p>}
          </>
        )}

        {step === 2 && (
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md"
          />
        )}

        {step === 3 && (
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={form.nickname}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-md"
          />
        )}

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md mb-3 disabled:opacity-50"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          {step < 3 ? "다음" : "회원가입"}
        </button>

        <button
          className="w-full text-sm text-blue-500 hover:underline"
          onClick={() => navigate("/login")}
        >
          이미 계정이 있으신가요? 로그인하기
        </button>
      </div>
    </div>
  );
}

export default Signup;
