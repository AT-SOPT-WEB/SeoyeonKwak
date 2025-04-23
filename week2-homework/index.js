function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

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

  filtered.forEach((todo, index) => {
    const tr = document.createElement("tr");

    const tdCheck = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      const todos = getTodos();
      todos[index].completed = checkbox.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
      applyFilters(); // 체크박스 바뀌면 다시 필터 적용
    });

    tdCheck.appendChild(checkbox);

    const tdPriority = document.createElement("td");
    tdPriority.textContent = todo.priority;

    const tdCompleted = document.createElement("td");
    tdCompleted.textContent = todo.completed ? "완료" : "미완료";

    const tdTitle = document.createElement("td");
    tdTitle.textContent = todo.title;

    tr.appendChild(tdCheck);
    tr.appendChild(tdPriority);
    tr.appendChild(tdCompleted);
    tr.appendChild(tdTitle);

    tbody.appendChild(tr);
  });
}

function applyFilters() {
  const status =
    document.querySelector(".filter-btn.active")?.dataset.filter || "all";
  const priority = document.getElementById("priority-select").value;
  renderTable(getTodos(), status, priority);
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelectorAll(".filter-btn");
  const prioritySelect = document.getElementById("priority-select");

  // 버튼 클릭 이벤트
  btns.forEach((btn) => {
    btn.addEventListener("click", function () {
      btns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      applyFilters();
    });
  });

  // 중요도 셀렉트 변경 이벤트
  prioritySelect.addEventListener("change", applyFilters);

  // fetch로 초기 데이터 가져오기 (최초 실행 시)
  if (!localStorage.getItem("todos")) {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("todos", JSON.stringify(data));
        applyFilters();
      });
  } else {
    applyFilters(); // 로컬스토리지 있으면 바로 렌더링
  }
});

// 할 일 추가
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("todo-input");
const priorityInput = document.getElementById("priority-input");

addBtn.addEventListener("click", () => {
  const title = todoInput.value.trim();
  const priority = priorityInput.value;

  if (!title || !priority) {
    alert("할 일과 중요도를 모두 입력해주세요!");
    return;
  }

  const newTodo = {
    title,
    priority: Number(priority),
    completed: false,
  };

  const todos = getTodos();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));

  // 입력값 초기화
  todoInput.value = "";
  todoInput.placeholder = "할 일을 입력하세요";
  priorityInput.value = "";

  applyFilters(); // 현재 필터 상태로 다시 렌더링
});
