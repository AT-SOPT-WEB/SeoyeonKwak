import { useState } from "react";
import { updateNickname } from "../api/api";

function MyPage() {
  const [nickname, setNickname] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await updateNickname({ nickname });

      if (response.success) {
        alert(`닉네임이 "${nickname}"(으)로 변경되었습니다!`);
        setNickname(""); // 입력창 비우기
      } else {
        alert(response.message || "닉네임 저장에 실패했습니다.");
      }
    } catch (err) {
      console.error("닉네임 저장 오류:", err);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">마이 페이지</h1>

        <label className="text-sm text-gray-600 mb-1">새 닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="변경할 닉네임을 입력하세요"
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-blue-500 text-white py-2 rounded-md disabled:opacity-50"
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default MyPage;
