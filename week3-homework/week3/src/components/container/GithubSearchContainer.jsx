import React, { useState, useEffect } from "react";

function GithubSearchContainer() {
  const [searchInput, setSearchInput] = useState("");
  const [userInfo, setUserInfo] = useState({ status: "idle", data: null });
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const updateRecentSearches = (username) => {
    const filtered = recentSearches.filter((id) => id !== username);
    const newList = [...filtered, username]; // 최신 것을 오른쪽에
    const limitedList = newList.slice(-3); // 최대 3개
    setRecentSearches(limitedList);
    localStorage.setItem("recentSearches", JSON.stringify(limitedList));
  };

  const getUserInfo = async (username) => {
    if (!username) return;
    setUserInfo({ status: "pending", data: null });

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setUserInfo({ status: "resolved", data });
      updateRecentSearches(username);
    } catch {
      setUserInfo({ status: "rejected", data: null });
    }
  };

  const handleClearUser = () => {
    setUserInfo({ status: "idle", data: null });
  };

  const handleGoToGithub = () => {
    if (userInfo.data?.html_url) {
      window.open(userInfo.data.html_url, "_blank");
    }
  };

  const handleDeleteSearch = (idToDelete) => {
    const updated = recentSearches.filter((id) => id !== idToDelete);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearch = () => {
    getUserInfo(searchInput.trim());
    setSearchInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div>
      {/* ✅ 입력창 및 검색 버튼 */}
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="깃허브 아이디를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>

      {/* ✅ 최근 검색어 목록 */}
      {recentSearches.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>최근 검색어</h3>
          <ul style={{ display: "flex", gap: "8px" }}>
            {recentSearches.map((id) => (
              <li
                key={id}
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => getUserInfo(id)}
                >
                  {id}
                </span>
                <button
                  onClick={() => handleDeleteSearch(id)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ 사용자 정보 */}
      {userInfo.status === "resolved" && (
        <div style={{ position: "relative", marginTop: "16px" }}>
          <button
            onClick={handleClearUser}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "transparent",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ❌
          </button>

          <div onClick={handleGoToGithub} style={{ cursor: "pointer" }}>
            <img
              src={userInfo.data.avatar_url}
              alt="avatar"
              width={100}
              style={{ borderRadius: "50%" }}
            />
            <h2>{userInfo.data.name}</h2>
          </div>

          <p>깃허브 아이디: {userInfo.data.login}</p>
          <p>자기소개: {userInfo.data.bio || "소개 없음"}</p>
          <p>
            깃허브 주소:{" "}
            <a href={userInfo.data.html_url} target="_blank" rel="noreferrer">
              {userInfo.data.html_url}
            </a>
          </p>
          <p>팔로워: {userInfo.data.followers}</p>
          <p>팔로잉: {userInfo.data.following}</p>
        </div>
      )}
    </div>
  );
}

export default GithubSearchContainer;
