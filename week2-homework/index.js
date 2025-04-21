fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("todos", JSON.stringify(data));
    renderTable(data);
  });

function renderTable(todos) {
  const tbody = document.querySelector("#todo-table");
  tbody.innerHTML = "";

  todos.forEach((todo) => {
    const tr = document.createElement("tr");

    const tdCheck = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    tdCheck.appendChild(checkbox);

    const tdPriority = document.createElement("td");
    tdPriority.textContent = todo.priority;

    const tdCompleted = document.createElement("td");
    tdCompleted.textContent = todo.completed ? "완료" : "미완료";

    const tdTitle = document.createElement("td");
    tdTitle.textContent = todo.title;

    // tr에 td들 추가
    tr.appendChild(tdCheck);
    tr.appendChild(tdPriority);
    tr.appendChild(tdCompleted);
    tr.appendChild(tdTitle);

    tbody.appendChild(tr);
  });
}
