fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("todos", JSON.stringify(data));
    renderTable(data);
  });

function renderTable(todos, filter = "all", priorityFilter = "all") {
  const tbody = document.getElementById("todo-list");
  tbody.innerHTML = "";

  let filtered = todos;
  if (filter === "completed") {
    filtered = todos.filter((todo) => todo.completed);
  } else if (filter === "incomplete") {
    filtered = todos.filter((todo) => !todo.completed);
  }

  if (priorityFilter !== "all") {
    filtered = filtered.filter(
      (todo) => String(todo.priority) === priorityFilter
    );
  }

  filtered.forEach((todo) => {
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

function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

document.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelectorAll(".filter-btn");
  const prioritySelect = document.getElementById("priority-select");

  function applyFilters() {
    const status =
      document.querySelector(".filter-btn.active")?.dataset.filter || "all";
    const priority = prioritySelect.value;
    renderTable(getTodos(), status, priority);
  }

  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      btns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      applyFilters();
    });
  });

  prioritySelect.addEventListener("change", applyFilters);
});
