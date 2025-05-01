import Card from "./components/Card";
import Header from "./components/Header";
import Search from "./components/Search";

import { members } from "./data/member";
import useSearch from "./hooks/useSearch";

function App() {
  const { searchContent, filteredMembers, handleSearchChange, handleSearch } =
    useSearch(members);

  return (
    <>
      <Header />
      <Search
        searchContent={searchContent}
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
      />
      <section style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            name={member.name}
            github={member.github}
            englishName={member.englishName}
          />
        ))}
      </section>
    </>
  );
}

export default App;
