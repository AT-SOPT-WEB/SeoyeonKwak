function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>

        <input
          type="text"
          placeholder="아이디"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="비밀번호"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-3">
          로그인
        </button>

        <button className="w-full text-sm text-blue-500 hover:underline">
          회원가입 페이지로 이동
        </button>
      </div>
    </div>
  );
}

export default App;
