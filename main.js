class DeleteModal {
  targetId = "";

  open(event) {
    this.targetId = event.target.name;
    const targetName = event.target.value;

    document.getElementById("delete-target-item").textContent = targetName;
    document.getElementById("delete-confirm-modal").style.display = "";
  }

  confirm() {
    const targetItem = document.getElementById(this.targetId);
    targetItem.remove();
    this.close();
    counter.updateDisplay();
  }

  close() {
    document.getElementById("delete-confirm-modal").style.display = "none";
  }
}

class Counter {
  updateDisplay() {
    const todoList = document.getElementById("todoList");
    const allCount = todoList.children.length;
    const doneCount = todoList.querySelectorAll("input[type='checkbox']:checked").length;
    const notDoneCount = allCount - doneCount;

    document.getElementById("allTODOCount").textContent = allCount;
    document.getElementById("doneTODOCount").textContent = doneCount;
    document.getElementById("notDoneTODOCount").textContent = notDoneCount;
  }
}

const counter = new Counter();
const deleteModal = new DeleteModal();

const addTodo = () => {
    const TodoInput = document.getElementById("todoInput");
    const TodoText = TodoInput.value.trim();
    if (!TodoText) {
        alert("Todoを入力してください");
        return;
    }

    const todoId = Math.random();

    const TodoLabelItem = document.createElement("label");
    TodoLabelItem.textContent = TodoText;
    TodoLabelItem.htmlFor = todoId;

    const TodoCheckboxItem = document.createElement("input");
    TodoCheckboxItem.type = "checkbox";
    TodoCheckboxItem.value = TodoText;
    TodoCheckboxItem.name = todoId;
    TodoCheckboxItem.addEventListener("click", handleTodoToggle);

    const TodoDeleteButton = document.createElement("button")
    TodoDeleteButton.value = TodoText;
    TodoDeleteButton.textContent = "削除";
    TodoDeleteButton.name = todoId;
    TodoDeleteButton.addEventListener("click", (event) => deleteModal.open(event))

    const TodoEditButton = document.createElement("button")
    TodoEditButton.value = TodoText;
    TodoEditButton.textContent = "編集";
    TodoEditButton.name = todoId;
    TodoEditButton.addEventListener("click", handleEditMode)

    const TodoList = document.getElementById("todoList");
    const TodoItem = document.createElement("li");
    TodoItem.id = todoId;
    TodoItem.value = TodoText;

    TodoItem.appendChild(TodoCheckboxItem);
    TodoItem.appendChild(TodoLabelItem);
    TodoItem.appendChild(TodoDeleteButton);
    TodoItem.appendChild(TodoEditButton);
    TodoList.appendChild(TodoItem);

    counter.updateDisplay();

    TodoInput.value = "";
}

const handleTodoToggle = () => {
    counter.updateDisplay();
}



const handleEditMode = (event) => {
    const editTargetId = event.target.name;
    const item = document.getElementById(editTargetId)
    const TodoName = item.querySelector("label").textContent;
    
    Array.from(item.children).forEach(child => {
      child.style.display = "none";
    })

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = TodoName; 
    editInput.classList.add("edit-field");

    const saveButton = document.createElement("button");
    saveButton.textContent = "保存"
    saveButton.classList.add("edit-field")
    saveButton.addEventListener("click", () => {
        let newTodoName;
        newTodoName = editInput.value;
        console.log(newTodoName)

        item.querySelector("label").textContent = newTodoName;

        item.querySelectorAll(".edit-field").forEach(el => el.remove());

        Array.from(item.children).forEach(child => {
          child.style.display = "";
        })
    })
    
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "キャンセル"
    cancelButton.classList.add("edit-field")
    cancelButton.addEventListener("click", () => {
        item.querySelectorAll(".edit-field").forEach(el => el.remove());

        Array.from(item.children).forEach(child => {
          child.style.display = "";
        })
    })

    item.appendChild(editInput);
    item.appendChild(saveButton);
    item.appendChild(cancelButton);
}
