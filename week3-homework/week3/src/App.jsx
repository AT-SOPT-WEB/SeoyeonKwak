import { useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState({ status: "idle", data: null });

  // 사용자 정보를 가져오는 함수예요.
  // 매개변수 user는 사용자의 깃허브 아이디입니다.
  // 예시: getUserInfo('m2na7')
  // 함수에 매개변수를 넣어서 호출하면? userInfo의 상태(userInfo.status, userInfo.data)가 변경됩니다.
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

  // 개발자도구의 콘솔창에서 userInfo 데이터 확인 가능해요.
  // 콘솔창에서 데이터를 확인해보세요.
  console.log(userInfo);

  // userInfo 는 총 2개의 값을 포함하고 있어요.
  // 1. data : 데이터를 가져오는 상태
  // 2. status : 데이터
  //    - status 는 3개의 값을 가질 수 있어요.
  //      (1) idle : 데이터를 가져오지 않은 상태
  //      (2) pending : 데이터를 가져오는 중
  //      (3) resolved : 데이터를 가져오는 완료
  //      (4) rejected : 데이터를 가져오는 중 에러 발생
  //       심화과제에서는 pending, rejected 상태도 고려해야 해요.

  // userInfo.status, userInfo.data 를 통해 접근 가능하겠죠?
  // userInfo.status 는 데이터를 가져오는 상태를 확인할 수 있어요.
  // console.log(userInfo.status) 와 같이 접근 가능해요.

  // userInfo.data 는 말그대로 과제에서 사용자 정보를 표시하기 위한 값이에요.
  // console.log(userInfo.data) 와 같이 접근 가능해요.

  return (
    <div>
      {/* getUserInfo 함수안에 본인의 깃허브 아이디를 넣어서 확인해보세요! */}
      <button onClick={() => getUserInfo("m2na7")}>
        이 버튼을 누르면 사용자 정보를 가져옵니다.
      </button>

      {/* 기본과제에서 userInfo.status는 'resolved' 상태일 때만 아래와 같이 고려하면 됩니다. */}
      {/* 조건부 렌더링을 통해 resolved 상태 즉, 검색 결과 데이터가 있는 경우에 결과를 표시하는겁니다. */}
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

export default App;
