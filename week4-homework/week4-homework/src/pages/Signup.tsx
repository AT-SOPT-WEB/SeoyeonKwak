import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (step === 1 && name === "id") {
      if (!value) {
        setIdError("");
      } else if (value.length > 20) {
        setIdError("아이디는 20자 이하로 입력해주세요.");
      } else {
        setIdError("");
      }
    }

    if (step === 2 && (name === "password" || name === "confirmPassword")) {
      const pw = name === "password" ? value : form.password;
      const confirm = name === "confirmPassword" ? value : form.confirmPassword;

      if (!pw || !confirm) {
        setPwError("");
      } else if (pw.length > 20 || confirm.length > 20) {
        setPwError("비밀번호는 20자 이하로 입력해주세요.");
      } else if (pw !== confirm) {
        setPwError("비밀번호가 일치하지 않습니다.");
      } else {
        setPwError("");
      }
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("회원가입 정보:", form);
      alert("회원가입 완료!");
      navigate("/login");
    }
  };

  const isNextDisabled =
    (step === 1 && (!form.id || idError)) ||
    (step === 2 &&
      (!form.password ||
        !form.confirmPassword ||
        form.password.length > 20 ||
        form.confirmPassword.length > 20 ||
        pwError)) ||
    (step === 3 && !form.nickname);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>

        {step === 1 && (
          <>
            <label className="text-sm text-gray-600 mb-1">아이디</label>
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
          <>
            <label className="text-sm text-gray-600 mb-1">비밀번호</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 border rounded-md"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-sm text-blue-500 mb-2"
            >
              {showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"}
            </button>
            {pwError && <p className="text-red-500 text-sm mb-3">{pwError}</p>}
          </>
        )}

        {step === 3 && (
          <>
            <label className="text-sm text-gray-600 mb-1">닉네임</label>

            <input
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={form.nickname}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded-md"
            />
          </>
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
