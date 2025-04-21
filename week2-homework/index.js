fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("todos", JSON.stringify(data));
  });
