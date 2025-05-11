import { useState } from "react";
import { searchNickname } from "../api/api";

function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const res = await searchNickname(keyword); // 빈 문자열도 전달 가능
      if (res.success) {
        setResults(res.data.nicknameList);
        setError("");
      } else {
        setResults([]);
        setError(res.message || "검색 실패");
      }
    } catch (err) {
      console.error("검색 에러:", err);
      setError("검색 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">회원 검색</h1>

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="닉네임 입력 (비워두면 전체 조회)"
          className="w-full px-4 py-2 border rounded mb-3"
        />

        <button
          onClick={handleSearch}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          확인
        </button>

        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

        {results.length > 0 && (
          <ul className="mt-6 space-y-2">
            {results.map((nick, index) => (
              <li
                key={index}
                className="bg-gray-100 px-4 py-2 rounded border text-sm"
              >
                {nick}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserSearch;
