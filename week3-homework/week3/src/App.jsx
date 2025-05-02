/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import Header from "./components/Header";
import GithubSearchContainer from "./components/container/GithubSearchContainer";
import BaseballContainer from "./components/container/BaseballContainer";

const rootWrapper = css`
  width: 100vw;
`;
const contentWrapper = css`
  max-width: 600px;
  margin: 40px auto 0;
  padding: 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

function App() {
  const [activeTab, setActiveTab] = useState("github");
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
    <div css={rootWrapper}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main css={contentWrapper}>
        {activeTab === "github" ? (
          <GithubSearchContainer />
        ) : (
          <BaseballContainer />
        )}

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
      </main>
    </div>
  );
}

export default App;
