import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../api/api";

export default function Header() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const res = await getMyProfile();
        if (res.success) {
          setNickname(res.data.nickname);
        } else {
          console.warn("닉네임 조회 실패:", res.message);
        }
      } catch (err) {
        console.error("닉네임 조회 중 오류:", err);
      }
    };

    fetchNickname();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const goTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-md flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-600">SOPT 4주차 과제</h1>

      <nav className="hidden md:flex gap-6 items-center">
        <button onClick={() => goTo("/mypage")} className="hover:underline">
          내 정보
        </button>
        <button onClick={() => goTo("/users")} className="hover:underline">
          회원 조회
        </button>
        <button onClick={handleLogout} className="text-red-500 hover:underline">
          로그아웃
        </button>
        <span className="text-sm text-gray-600">👤 {nickname}</span>
      </nav>

      <button
        className="md:hidden text-gray-700"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        ☰
      </button>

      <div
        className={`${
          isMenuOpen ? "max-h-40 py-4" : "max-h-0 py-0"
        } absolute top-[60px] left-0 w-full bg-white overflow-hidden flex flex-col items-center border-b border-gray-200 shadow-md md:hidden transition-all duration-300 ease-in-out`}
      >
        <button onClick={() => goTo("/mypage")} className="py-2">
          내 정보
        </button>
        <button onClick={() => goTo("/users")} className="py-2">
          회원 조회
        </button>
        <button onClick={handleLogout} className="py-2 text-red-500">
          로그아웃
        </button>
        <span className="text-sm text-gray-600 mt-2">👤 {nickname}</span>
      </div>
    </header>
  );
}
