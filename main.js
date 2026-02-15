// 基本的に疎結合最重視
// データの受け渡しを最小限に抑える
// 操作対象のTODOをどう管理するかがカギ
// グローバル変数に逃げてない?クラス化して各TODOをインスタンスとして管理しそれぞれのインスタンス内でしか

let notDoneCountNumber = 0;
let doneCountNumber = 0;
let allCountNumber = 0;
let deleteTargetItemID = "";
let deleteTargetItemName = "";
let isdeleteTargetItemChecked = "";

const addTODO = () => {
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value;

    const ramdomNumberID = Math.random();

    const todoLabelItem = document.createElement("label");
    todoLabelItem.textContent = todoText;
    todoLabelItem.htmlFor = ramdomNumberID;

    const todoCheckboxItem = document.createElement("input");
    todoCheckboxItem.type = "checkbox";
    todoCheckboxItem.value = todoText;
    todoCheckboxItem.name = ramdomNumberID;
    todoCheckboxItem.addEventListener("click", handleTODOCount);

    const todoDeleteButton = document.createElement("button")
    todoDeleteButton.value = todoText;
    todoDeleteButton.textContent = "削除";
    todoDeleteButton.name = ramdomNumberID;
    todoDeleteButton.addEventListener("click", openTODODeleteModal)

    const todoEditButton = document.createElement("button")
    todoEditButton.value = todoText;
    todoEditButton.textContent = "編集";
    todoEditButton.name = ramdomNumberID;
    todoEditButton.addEventListener("click", hanleEditMode)

    const todoList = document.getElementById("todoList");
    const todoItem = document.createElement("li");
    todoItem.id = ramdomNumberID;
    todoItem.value = todoText;

    todoItem.appendChild(todoCheckboxItem);
    todoItem.appendChild(todoLabelItem);
    todoItem.appendChild(todoDeleteButton);
    todoItem.appendChild(todoEditButton);
    todoList.appendChild(todoItem);

    notDoneCountNumber += 1;
    updateNotDoneCount();

    allCountNumber += 1;
    updateAllCountNumber();

    todoInput.value = "";
}

const handleTODOCount = (event) => {
    const checkboxState = event.target.checked;
    if (checkboxState) {
        notDoneCountNumber -= 1;
        updateNotDoneCount();

        doneCountNumber += 1;
        updateDoneCount();
    } else {
        notDoneCountNumber += 1;
        updateNotDoneCount();

        doneCountNumber -= 1;
        updateDoneCount();
    }
}

const updateDoneCount = () => {
        const doneCount = document.getElementById("doneTODOCount");
        doneCount.textContent = doneCountNumber;
    }

const updateNotDoneCount = () => {
    const notDoneCount = document.getElementById("notDoneTODOCount");
    notDoneCount.textContent = notDoneCountNumber;
}

const updateAllCountNumber = () => {
    const notDoneCount = document.getElementById("allTODOCount");
    notDoneCount.textContent = allCountNumber;
}

const deleteTODO = () => {
    const deleteItem = document.getElementById(deleteTargetItemID);
    deleteItem.remove();
    if (isdeleteTargetItemChecked){
        doneCountNumber--;
        updateDoneCount();

    } else {
      notDoneCountNumber--;
      updateNotDoneCount();
    }

    closeTODODeleteModal();

    allCountNumber--;
    updateAllCountNumber();
}

const hanleEditMode = (event) => {
    const deleteTargetItemID = event.target.name;
    const item = document.getElementById(deleteTargetItemID)
    const todoName = item.querySelector("label").textContent;
    
    Array.from(item.children).forEach(child => {
      child.style.display = "none";
    })

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todoName; 
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

const openTODODeleteModal = (event) => {
    const deleteModal = document.getElementById("delete-confirm-modal")
    deleteModal.style.display = "";

    deleteTargetItemID = event.target.name; // globalにセットし、delete()で使えるようにする
  
    const checkbox = event.target.parentElement.querySelector("input[type='checkbox']");
    isdeleteTargetItemChecked = checkbox.checked;

    const deleteTargetItem = document.getElementById("delete-target-item");
    deleteTargetItemName = event.target.value;
    deleteTargetItem.textContent = deleteTargetItemName;
}

const cancelDeleteTodo = () => {
  closeTODODeleteModal();
}

const closeTODODeleteModal = () => {
    const deleteModal = document.getElementById("delete-confirm-modal")
    deleteModal.style.display = "none";
}