import { useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Search from "./components/Search";

import { members } from "./data/member";

function App() {
  const [searchContent, setSearchContent] = useState("");

  const handleSearch = (event) => {
    setSearchContent(event.target.value);
    console.log(event.target.value);
  };
  return (
    <>
      <Header />
      <Search searchContent={searchContent} handleSearch={handleSearch} />
      <section style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {members
          .filter((member) =>
            member.name.toLowerCase().includes(searchContent.toLowerCase())
          )
          .map((member) => (
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
