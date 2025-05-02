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

  return (
    <div css={rootWrapper}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main css={contentWrapper}>
        {activeTab === "github" ? (
          <GithubSearchContainer />
        ) : (
          <BaseballContainer />
        )}
      </main>
    </div>
  );
}

export default App;
