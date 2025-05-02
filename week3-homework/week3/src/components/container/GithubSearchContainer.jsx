import React, { useState } from "react";

function GithubSearchContainer() {
  const [userInfo, setUserInfo] = useState({ status: "idle", data: null });

  const getUserInfo = async (user) => {
    setUserInfo({ status: "pending", data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setUserInfo({ status: "resolved", data });
    } catch {
      setUserInfo({ status: "rejected", data: null });
    }
  };

  return (
    <div>
      <button onClick={() => getUserInfo("m2na7")}>
        이 버튼을 누르면 사용자 정보를 가져옵니다.
      </button>
      {userInfo.status === "resolved" && (
        <div>
          <img src={userInfo.data.avatar_url} />
          <p>{userInfo.data.name}</p>
          <p>한 줄소개: {userInfo.data.bio}</p>
          <p>팔로워: {userInfo.data.followers}</p>
          <p>팔로잉: {userInfo.data.following}</p>

          <p>
            깃허브 프로필 링크:
            <a href={userInfo.data.html_url}>{userInfo.data.html_url}</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default GithubSearchContainer;
