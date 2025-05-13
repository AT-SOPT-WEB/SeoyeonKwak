interface Props {
  password: string;
  confirmPassword: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  toggleShow: () => void;
  error: string;
}

export default function PasswordInput({
  password,
  confirmPassword,
  onChange,
  show,
  toggleShow,
  error,
}: Props) {
  return (
    <>
      <label className="text-sm text-gray-600 mb-2">비밀번호</label>
      <input
        type={show ? "text" : "password"}
        name="password"
        placeholder="비밀번호"
        value={password}
        onChange={onChange}
        className="w-full px-4 py-2 mb-2 border border-gray-200 rounded-md"
      />
      <input
        type={show ? "text" : "password"}
        name="confirmPassword"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={onChange}
        className="w-full px-4 py-2 mb-2 border border-gray-200 rounded-md"
      />
      <button
        type="button"
        onClick={toggleShow}
        className="text-sm text-blue-500 mb-2"
      >
        {show ? "비밀번호 숨기기" : "비밀번호 보이기"}
      </button>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
    </>
  );
}
