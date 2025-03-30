let toDos = JSON.parse(localStorage.getItem("to-dos")) || [];
let completedTasks = 0;
initialize();

// add event listener
document.querySelector("#input-box").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addToDo();
  }
});

function initialize() {
  toDos.forEach((item, index) => {
    createComponent(index, item.title);
    if (item.completed) {
      completedTasks++;
    }
  });
  if (toDos.length > 0) {
    updateStatus();
  }
}

function clearTasks() {
  localStorage.clear();
  toDos = [];
  document.querySelector("input").value = "";
  document.querySelector(".tasks").innerHTML = "";
}

function addToDo() {
  const curInputValue = document.querySelector("input").value;
  if (curInputValue === "") {
    alert("Please add some task.");
    return;
  }
  toDos.push({
    title: curInputValue,
    completed: false,
  });
  updateStatus();
  localStorage.setItem("to-dos", JSON.stringify(toDos));
  document.querySelector("input").value = "";
  render();
}

function render() {
  const index = toDos.length - 1;
  createComponent(index);
  return;
}

function createComponent(index, taskTitle) {
  const div = document.createElement("div");
  const span = document.createElement("span");

  // const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  div.setAttribute("class", "task-metadata");
  span.setAttribute("class", "task-title");

  // editButton.setAttribute("class", "edit-task-button");
  deleteButton.setAttribute("class", "delete-task-button");

  span.innerHTML = taskTitle ? taskTitle : toDos[index].title;

  // editButton.innerHTML = "🖊️";
  deleteButton.innerHTML = "X";

  if (toDos[index].completed) {
    span.style.textDecoration = "line-through";
  } else {
    const doneButton = document.createElement("button");
    doneButton.innerHTML = "✔️";
    doneButton.setAttribute("class", "task-completed-button");
    div.appendChild(doneButton);
    // add event listener
    doneButton.addEventListener("click", () => {
      doneButton.parentNode.removeChild(doneButton);
      toDos[index].completed = true;
      span.style.textDecoration = "line-through";
      completedTasks++;
      updateStatus();
      localStorage.setItem("to-dos", JSON.stringify(toDos));
      return;
    });
  }

  // div.appendChild(editButton);
  div.appendChild(deleteButton);
  div.appendChild(span);

  document.querySelector(".tasks").appendChild(div);

  deleteButton.addEventListener("click", () => {
    if (toDos[index].completed) {
      completedTasks--;
    }
    toDos = toDos.filter((item, ind) => ind !== index);
    div.parentNode.removeChild(div);
    updateStatus();
    localStorage.setItem("to-dos", JSON.stringify(toDos));
    return;
  });
  return div;
}

function updateStatus() {
  const progress = ((completedTasks / toDos.length) * 100).toFixed(0);
  const progressSpan = document.querySelector("#progress-span");
  progressSpan.innerHTML = `Progress :- ${progress}%`;
  const progressStatus = document.querySelector("#progress-status");
  progressStatus.style.width = `${progress}%`;
}
