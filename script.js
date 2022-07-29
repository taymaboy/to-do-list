// Нахожу элементы на странице
const form = document.querySelector("#form");
const inputTask = document.querySelector("#taskInput");
const tasksList = document.querySelector(".tasks-list");
const emptyList = document.querySelector(".empty-list");

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}
//  Рендерю таски из 
tasks.forEach(function (task) {
  
  const cssLi = task.done ? ' hover' : '';

  // Определяю разметку HTML для новой задачи
  const taskHTML = `<li id="${task.id}" class="list-item${cssLi}">
        <span class="task-item">${task.text}</span>
        <div class="task-item-buttons">
            <button type="button" data-action="done" class="btn-action">
             <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Delete" width="18" height="18">
            </button>
        </div>
    </li>`;

  //  Добавляю новую разметку в список ul
  tasksList.insertAdjacentHTML("beforeend", taskHTML);

});

checkEmptyList();

// Функции
function addTask(event) {
  // Отмена отправки формы по дефолту
  event.preventDefault();

  // Достаю текст из инпута
  const taskText = inputTask.value;

  // Задаю объект под новую задачу
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  
  // Добавляю новую задачу в массив
  tasks.push(newTask);

  // Задаю класс для li
  const cssLi = newTask.done ? ' hover' : '';

  // Определяю разметку HTML для новой задачи
  const taskHTML = `<li id="${newTask.id}" class="list-item${cssLi}">
        <span class="task-item">${newTask.text}</span>
        <div class="task-item-buttons">
            <button type="button" data-action="done" class="btn-action">
             <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Delete" width="18" height="18">
            </button>
        </div>
    </li>`;

  //  Добавляю новую разметку в список ul
  tasksList.insertAdjacentHTML("beforeend", taskHTML);

  // Сбрасываю поле input и возвращаю фокус на input
  inputTask.value = "";
  inputTask.focus();

  checkEmptyList();

  saveToLocalStorage();
}

function deleteTask(event) {
  // Проверяю была ли нажата кнопка Удалить
  if (event.target.dataset.action !== "delete") return;

  // Определяю конкретную задачу из списка для удаления
    const parentLi = event.target.closest("li");

  // Определяю id задачи для удаления
    const id = parentLi.id;

  // Удаляю задачу из массива
  tasks = tasks.filter((task) => task.id != id);
    
    parentLi.remove();
  
    checkEmptyList();

    saveToLocalStorage();
}

function doneTask(event) {
  // Проверяю была ли нажата кнопка Сделано
  if (event.target.dataset.action === "done") {
    // Определяю и удаляю конкретную задачу из списка для выделения
    const parentLi = event.target.closest("li");
    parentLi.classList.toggle("hover");
  
  // Определяю id выполненной задачи 
  const id = parentLi.id;
  // Нахожу по id елемент в массиве
  const task = tasks.find((task) => task.id == id);
  // Меняю значение элемента
  task.done = !task.done
}

saveToLocalStorage();
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li class="empty-list">
        <div class="empty-title">Список задач пуст</div>
      </li>`;
      tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }
    if (tasks.length > 0) {
        const emptyListElement = document.querySelector('.empty-list');
        emptyListElement ? emptyListElement.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
} 

// Добавление в список задач
form.addEventListener("submit", addTask);

// Удаление из списка задач
tasksList.addEventListener("click", deleteTask);

//  Выделение завершенной задачи
tasksList.addEventListener("click", doneTask);
