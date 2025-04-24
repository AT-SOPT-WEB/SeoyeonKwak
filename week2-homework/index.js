// --- 유틸 함수: todos 가져오기 ---
function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function setTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// --- 테이블 렌더링 ---
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
    tr.dataset.index = todos.indexOf(todo); // ✅ 원본 todos의 인덱스를 저장

    const tdCheck = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      const todos = getTodos();
      todos[todos.indexOf(todo)].completed = checkbox.checked;
      setTodos(todos);
      applyFilters();
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

  // ✅ 전체 선택 체크박스 기능
  const selectAll = document.getElementById("select-all");
  selectAll.checked =
    filtered.length > 0 && filtered.every((todo) => todo.completed);

  selectAll.addEventListener("change", (e) => {
    const todos = getTodos();
    const checked = e.target.checked;

    filtered.forEach((todo) => {
      const index = todos.indexOf(todo);
      todos[index].completed = checked;
    });

    setTodos(todos);
    applyFilters();
  });
}

// --- 필터 적용 함수 ---
function applyFilters() {
  const status =
    document.querySelector(".filter-btn.active")?.dataset.filter || "all";
  const priority = document.getElementById("priority-select").value;
  renderTable(getTodos(), status, priority);
}

// --- 초기화 ---
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
        setTodos(data);
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
  setTodos(todos);

  // 입력값 초기화
  todoInput.value = "";
  todoInput.placeholder = "할 일을 입력하세요";
  priorityInput.value = "";

  applyFilters(); // 현재 필터 상태로 다시 렌더링
});

const deleteBtn = document.getElementById("delete-btn");

deleteBtn.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(
    "#todo-list input[type='checkbox']"
  );
  const todos = getTodos();

  const updatedTodos = [];
  checkboxes.forEach((checkbox, index) => {
    if (!checkbox.checked) {
      updatedTodos.push(todos[index]);
    }
  });

  setTodos(updatedTodos);
  applyFilters();
});

const completeBtn = document.getElementById("complete-btn");

completeBtn.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(
    "#todo-list input[type='checkbox']"
  );
  const todos = getTodos();

  let hasAlreadyCompleted = false;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const tr = checkbox.closest("tr");
      const index = parseInt(tr.dataset.index);
      if (todos[index].completed) {
        hasAlreadyCompleted = true;
      }
    }
  });

  if (hasAlreadyCompleted) {
    const modal = document.getElementById("complete-warning-modal");
    modal.classList.remove("hidden");
    return;
  }

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const tr = checkbox.closest("tr");
      const index = parseInt(tr.dataset.index);
      todos[index].completed = true;
    }
  });

  setTodos(todos);
  applyFilters();
});

const closeModalBtn = document.getElementById("close-modal-btn");
closeModalBtn.addEventListener("click", () => {
  const modal = document.getElementById("complete-warning-modal");
  modal.classList.add("hidden");
});
