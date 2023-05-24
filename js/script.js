const todoControl = document.querySelector('.todo-control'); // Получаем форму добавления дела
const headerInput = document.querySelector('.header-input'); // Получаем поле ввода
const todoList = document.querySelector('.todo-list'); // Получаем список дел
const todoComplete = document.querySelector('.todo-completed'); // Получаем список выполненных дел

let toDoData = []; // Массив для хранения данных о делах

const render = function () {
    todoList.innerHTML = ''; // Очищаем список дел
    todoComplete.innerHTML = ''; // Очищаем список выполненных дел

    // Цикл для отрисовки каждого дела из массива toDoData
    toDoData.forEach(function (item) {
        const li = document.createElement('li'); // Создаем элемент списка для дела
        li.classList.add('todo-item'); // Добавляем класс к элементу списка

        // Формируем HTML-разметку для дела
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoComplete.append(li); // Если дело выполнено, добавляем его в список выполненных дел
        } else {
            todoList.append(li); // Иначе добавляем его в список дел
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed; // Переключаем состояние выполнения дела
            render(); // Обновляем отображение списка дел (рекурсивный вызов функции render)
        });

        li.querySelector('.todo-remove').addEventListener('click', function () {
            toDoData = toDoData.filter((todo) => todo !== item); // Удаляем дело из массива
            render(); // Обновляем отображение списка дел (рекурсивный вызов функции render)
        });
    });
};

const saveToLocalStorage = function () {
    localStorage.setItem('toDoData', JSON.stringify(toDoData)); // Сохраняем массив дел в localStorage
};

const loadFromLocalStorage = function () {
    const data = localStorage.getItem('toDoData'); // Получаем данные из localStorage
    if (data) {
        toDoData = JSON.parse(data); // Если данные существуют, конвертируем их в массив дел
        render(); // Обновляем отображение списка дел
    }
};

// Обработчик события отправки формы
todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputValue = headerInput.value.trim();
    if (inputValue === '') {
        return; // Если поле ввода пустое, прекращаем выполнение функции
    }

    const newToDo = {
        text: inputValue,
        completed: false
    };

    toDoData.push(newToDo); // Добавляем новое дело в массив
    headerInput.value = ''; // Очищаем поле ввода
    saveToLocalStorage(); // Сохраняем данные в localStorage
    render(); // Обновляем отображение списка дел
});

loadFromLocalStorage(); // Загружаем данные из localStorage при загрузке страницы
