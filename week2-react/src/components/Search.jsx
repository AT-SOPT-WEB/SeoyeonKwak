const Search = ({ searchContent, handleSearch }) => {
  return (
    <div>
      <input
        type="text"
        value={searchContent}
        placeholder="검색 내용을 입력해보세요"
        onChange={handleSearch}
      />
    </div>
  );
};
export default Search;
