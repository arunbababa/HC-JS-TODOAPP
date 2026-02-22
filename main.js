// 操作に対する操作系メソッド

// カウント表示を更新する
const updateCountDisplay = (todoList, allTodoCount, doneTodoCount, notDoneTodoCount) => {
    const allCount = todoList.children.length;
    const doneCount = todoList.querySelectorAll("input[type='checkbox']:checked").length;
    const notDoneCount = allCount - doneCount;

    allTodoCount.textContent = allCount;
    doneTodoCount.textContent = doneCount;
    notDoneTodoCount.textContent = notDoneCount;
};

// 削除確認モーダルを開く
const openDeleteModal = (event, deleteConfirmModal, deleteTargetItem) => {
    deleteConfirmModal.dataset.targetId = event.target.name;
    const targetName = event.target.value;

    deleteTargetItem.textContent = targetName;
    deleteConfirmModal.style.display = "";
};

// 削除確認モーダルを閉じる
const closeDeleteModal = (deleteConfirmModal) => {
    deleteConfirmModal.style.display = "none";
};

// 削除対象のTodoをDOMから削除する
const deleteTodoItem = (deleteConfirmModal) => {
    const targetItem = document.getElementById(deleteConfirmModal.dataset.targetId);
    targetItem.remove();
};

// 編集モードの切り替え
const handleEditToggle = (event) => {
    const editTargetId = event.target.name;
    const item = document.getElementById(editTargetId);
    const todoName = item.querySelector("label").textContent;

    Array.from(item.children).forEach(child => {
        child.style.display = "none";
    });

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = todoName;
    editInput.classList.add("edit-field");

    const saveButton = document.createElement("button");
    saveButton.textContent = "保存";
    saveButton.classList.add("edit-field");
    saveButton.addEventListener("click", () => {
        const newTodoName = editInput.value;

        item.querySelector("label").textContent = newTodoName;
        item.querySelectorAll(".edit-field").forEach(el => el.remove());

        Array.from(item.children).forEach(child => {
            child.style.display = "";
        });
    });

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "キャンセル";
    cancelButton.classList.add("edit-field");
    cancelButton.addEventListener("click", () => {
        item.querySelectorAll(".edit-field").forEach(el => el.remove());

        Array.from(item.children).forEach(child => {
            child.style.display = "";
        });
    });

    item.appendChild(editInput);
    item.appendChild(saveButton);
    item.appendChild(cancelButton);
};

const createTodoItem = (todoText, todoList, allTodoCount, doneTodoCount, notDoneTodoCount, deleteConfirmModal, deleteTargetItem) => {
    const todoId = Math.random();

    const todoLabelItem = document.createElement("label");
    todoLabelItem.textContent = todoText;

    const todoCheckboxItem = document.createElement("input");
    todoCheckboxItem.type = "checkbox";
    todoCheckboxItem.addEventListener("click", () =>
        updateCountDisplay(todoList, allTodoCount, doneTodoCount, notDoneTodoCount)
    );

    const todoDeleteButton = document.createElement("button");
    todoDeleteButton.value = todoText;
    todoDeleteButton.textContent = "削除";
    todoDeleteButton.name = todoId;
    todoDeleteButton.addEventListener("click", (event) =>
        openDeleteModal(event, deleteConfirmModal, deleteTargetItem)
    );

    const todoEditButton = document.createElement("button");
    todoEditButton.textContent = "編集";
    todoEditButton.name = todoId;
    todoEditButton.addEventListener("click", handleEditToggle);

    const todoItem = document.createElement("li");
    todoItem.id = todoId;

    todoItem.appendChild(todoCheckboxItem);
    todoItem.appendChild(todoLabelItem);
    todoItem.appendChild(todoDeleteButton);
    todoItem.appendChild(todoEditButton);

    return todoItem;
};

// ページ読み込み時の初期化
const init = () => {
    // updateCountDisplay, createTodoItem, deleteTodoItem用
    const todoList = document.getElementById("todo-list");
    const allTodoCount = document.getElementById("all-todo-count");
    const doneTodoCount = document.getElementById("done-todo-count");
    const notDoneTodoCount = document.getElementById("not-done-todo-count");

    // createTodoItem用
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");

    // openDeleteModal, deleteTodoItem, closeDeleteModal用
    const deleteConfirmModal = document.getElementById("delete-confirm-modal");
    const deleteTargetItem = document.getElementById("delete-target-item");
    const deleteConfirmButton = document.getElementById("delete-confirm-button");
    const deleteCancelButton = document.getElementById("delete-cancel-button");

    // イベントリスナー登録
    addButton.addEventListener("click", () => {
        const todoText = todoInput.value.trim();
        if (!todoText) {
            alert("Todoを入力してください");
            return;
        }
        const todoItem = createTodoItem(todoText, todoList, allTodoCount, doneTodoCount, notDoneTodoCount, deleteConfirmModal, deleteTargetItem);
        todoList.appendChild(todoItem);
        updateCountDisplay(todoList, allTodoCount, doneTodoCount, notDoneTodoCount);
        todoInput.value = "";
    });

    deleteConfirmButton.addEventListener("click", () => {
        deleteTodoItem(deleteConfirmModal);
        closeDeleteModal(deleteConfirmModal);
        updateCountDisplay(todoList, allTodoCount, doneTodoCount, notDoneTodoCount);
    });

    deleteCancelButton.addEventListener("click", () =>
        closeDeleteModal(deleteConfirmModal)
    );
};

init();
