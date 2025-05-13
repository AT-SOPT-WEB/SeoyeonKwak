import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/api";
import IdInput from "../components/signup/IdInput";
import PasswordInput from "../components/signup/PasswordInput";
import NicknameInput from "../components/signup/NicknameInput";

// STEP 상수 정의
const STEP = {
  ID: 1,
  PASSWORD: 2,
  NICKNAME: 3,
} as const;

function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(STEP.ID);
  const [form, setForm] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (step === STEP.ID && name === "id") {
      if (!value) setIdError("");
      else if (value.length > 20)
        setIdError("아이디는 20자 이하로 입력해주세요.");
      else setIdError("");
    }

    if (
      step === STEP.PASSWORD &&
      (name === "password" || name === "confirmPassword")
    ) {
      const pw = name === "password" ? value : form.password;
      const confirm = name === "confirmPassword" ? value : form.confirmPassword;

      if (!pw || !confirm) setPwError("");
      else if (pw.length > 20 || confirm.length > 20)
        setPwError("비밀번호는 20자 이하로 입력해주세요.");
      else if (pw !== confirm) setPwError("비밀번호가 일치하지 않습니다.");
      else setPwError("");
    }
  };

  const handleNext = async () => {
    if (step < STEP.NICKNAME) {
      setStep((prev) => prev + 1);
    } else {
      try {
        const res = await signup({
          loginId: form.id,
          password: form.password,
          nickname: form.nickname,
        });

        if (res.success) {
          alert(`${res.data.nickname}님, 회원가입이 완료되었습니다!`);
          navigate("/login");
        } else {
          alert(res.message || "회원가입에 실패했습니다.");
        }
      } catch (err) {
        console.error("회원가입 요청 중 오류:", err);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  const isNextDisabled =
    (step === STEP.ID && (!form.id || idError)) ||
    (step === STEP.PASSWORD &&
      (!form.password ||
        !form.confirmPassword ||
        form.password.length > 20 ||
        form.confirmPassword.length > 20 ||
        pwError)) ||
    (step === STEP.NICKNAME && !form.nickname);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>

        {step === STEP.ID && (
          <IdInput value={form.id} onChange={handleChange} error={idError} />
        )}
        {step === STEP.PASSWORD && (
          <PasswordInput
            password={form.password}
            confirmPassword={form.confirmPassword}
            onChange={handleChange}
            show={showPassword}
            toggleShow={() => setShowPassword((prev) => !prev)}
            error={pwError}
          />
        )}
        {step === STEP.NICKNAME && (
          <NicknameInput value={form.nickname} onChange={handleChange} />
        )}

        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md mb-3 disabled:opacity-50"
          onClick={handleNext}
          disabled={isNextDisabled}
        >
          {step < STEP.NICKNAME ? "다음" : "회원가입"}
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
