function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function setTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
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

  filtered.forEach((todo) => {
    const tr = document.createElement("tr");
    tr.dataset.index = todos.indexOf(todo); // 원본 todos의 인덱스를 저장

    const tdCheck = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false; // 항상 초기에는 선택되지 않도록

    checkbox.addEventListener("change", () => {
      // 하나라도 체크 해제되면 전체 선택도 해제
      const selectAll = document.getElementById("select-all");
      const checkboxes = document.querySelectorAll(
        "#todo-list input[type='checkbox']"
      );
      const allChecked = [...checkboxes].every((cb) => cb.checked);
      selectAll.checked = allChecked;
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

  // 전체 선택 체크박스 기능
  const selectAll = document.getElementById("select-all");
  selectAll.checked =
    filtered.length > 0 &&
    [...tbody.querySelectorAll("input[type='checkbox']")].every(
      (checkbox) => checkbox.checked
    );

  selectAll.addEventListener("change", (e) => {
    const checked = e.target.checked;

    // tbody 내 모든 체크박스에 대해 상태 설정
    tbody.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.checked = checked;
    });
  });
}

// 필터링 구현 부분
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
