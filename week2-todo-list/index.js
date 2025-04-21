document.getElementById("add-button").addEventListener("click", () => {
  const input = document.getElementById("input").value;
  const ul = document.getElementById("ul");

  let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

  const li = document.createElement("li");
  li.innerText = input;
  ul.appendChild(li);

  todoList.push(input);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  document.getElementById("input").value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  const ul = document.getElementById("ul");
  const savedList = JSON.parse(localStorage.getItem("todoList")) || [];

  savedList.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    ul.appendChild(li);
  });
});
