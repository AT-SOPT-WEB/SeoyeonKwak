/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import closeIcon from "../../assets/ic-close.svg";

const cardStyle = css`
  position: relative;
  margin-top: 16px;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const closeButtonStyle = css`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const avatarStyle = css`
  border-radius: 50%;
  width: 100px;
`;

const clickableStyle = css`
  cursor: pointer;
  text-align: center;
`;

function GithubProfileCard({ userInfo, onClear }) {
  const goToGithub = () => {
    if (userInfo?.html_url) {
      window.open(userInfo.html_url, "_blank");
    }
  };

  return (
    <div css={cardStyle}>
      <button css={closeButtonStyle} onClick={onClear}>
        <img src={closeIcon} alt="닫기" width="16" height="16" />
      </button>

      <div css={clickableStyle} onClick={goToGithub}>
        <img src={userInfo.avatar_url} alt="avatar" css={avatarStyle} />
        <h2>{userInfo.name}</h2>
      </div>

      <p>깃허브 아이디: {userInfo.login}</p>
      <p>자기소개: {userInfo.bio || "소개 없음"}</p>
      <p>
        깃허브 주소:{" "}
        <a href={userInfo.html_url} target="_blank" rel="noreferrer">
          {userInfo.html_url}
        </a>
      </p>
      <p>팔로워: {userInfo.followers}</p>
      <p>팔로잉: {userInfo.following}</p>
    </div>
  );
}

export default GithubProfileCard;
