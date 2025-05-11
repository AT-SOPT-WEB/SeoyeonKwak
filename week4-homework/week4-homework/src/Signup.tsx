function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        {/* 타이틀 */}
        <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>

        {/* 아이디 입력 */}
        <input
          type="text"
          placeholder="아이디"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 비밀번호 입력 */}
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 닉네임 입력 */}
        <input
          type="text"
          placeholder="닉네임"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 회원가입 버튼 */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-3">
          회원가입
        </button>

        {/* 로그인 페이지로 이동 버튼 */}
        <button
          className="w-full text-sm text-blue-500 hover:underline"
          onClick={() => {
            // 이동 방식은 라우터 사용 시 navigate("/login") 등으로 변경 가능
            alert("로그인 페이지로 이동합니다.");
          }}
        >
          이미 계정이 있으신가요? 로그인하기
        </button>
      </div>
    </div>
  );
}

export default Signup;
