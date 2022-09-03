// VARIABEL GLOBAL UNTUK MENYIMPAN ID WADAH YANG BELUM TERISI TODO
const UNCOMPLETED_LIST_TODO_ID = "todos";
// VARIABEL GLOBAL UNTUK MENYIMPAN ID WADAH YANG SUDAH TERISI TODO
const COMPLETED_LIST_TODO_ID = "completed-todos";

// FUNGSI MEMBUAT ELEMEN HTML SEBAGAI WADAH VALUE TO DO
function makeTodo(data /* string */, timestamp /* string */, isCompleted /* boolean */) {
  const textTitle = document.createElement("h2");
  textTitle.innerText = data;

  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimestamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);

  if (isCompleted) {
    // MENAMPILKAN TOMBOL UNDO DAN HAPUS
    container.append(createUndoButton(), createTrashButton());
  } else {
    // MENAMPILKAN TOMBOL CEKLIS
    container.append(createCheckButton());
  }
  // KETIKA FUNGSI MAKETODO DIPANGGIL VARIABEL CONTAINER INI YANG AKAN DI RETURN
  return container;
}
// FUNGSI UNTUK MEMBUAT TOMBOL UNDO
function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoTaskFromCompleted(event.target.parentElement);
  });
}

// MEMBUAT TOMBOL HAPUS KE TO DO YANG SUDAH SELESAI
function createTrashButton() {
  return createButton("trash-button", function (event) {
    removeTaskFromCompleted(event.target.parentElement);
  });
}

// FUNGSI UNTUK MENANDAI TO DO SEBAGAI SELESAI
function createCheckButton() {
  return createButton("check-button", function (event) {
    addTaskToCompleted(event.target.parentElement);
  });
}

// FUNGSI UNTUK MEMBUAT DAN MENAMPILKAN TOMBOL CEKLIS DAN TOMBOL INI MENJADI PATOKAN UNTUK TOMBOL2 YANG LAINNYA
function createButton(buttonTypeClass /* string */, eventListener /* callback function */) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

// FUNGSI UNTUK MENAMBAHKAN TO DO YANG AKAN DIMASUKAN KE WADAH
function addTodo() {
  const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
  const textTodo = document.getElementById("title").value;
  const timestamp = document.getElementById("date").value;

  const todo = makeTodo(textTodo, timestamp, false);

  uncompletedTODOList.append(todo);
}

//MENAMBAHKAN TO DO YANG SELESAI
function addTaskToCompleted(taskElement /* HTMLELement */) {
  const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

  const newTodo = makeTodo(taskTitle, taskTimestamp, true);

  listCompleted.append(newTodo);
  taskElement.remove();
}

// MENGHAPUS TO DO YANG SUDAH SELESAI
function removeTaskFromCompleted(taskElement /* HTMLELement */) {
  taskElement.remove();
}

// FUNGSI UNTUK MENGEMBALIKAN TO DO SELESAI KE TO DO YANG BELUM SELESAI (TOMBOL UNDO)
function undoTaskFromCompleted(taskElement /* HTMLELement */) {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
  const taskTitle = taskElement.querySelector(".inner > h2").innerText;
  const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

  const newTodo = makeTodo(taskTitle, taskTimestamp, false);

  listUncompleted.append(newTodo);
  taskElement.remove();
}
