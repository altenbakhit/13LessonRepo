const appData = {
    todoControl: document.querySelector('.todo-control'),
    headerInput: document.querySelector('.header-input'),
    todoList: document.querySelector('.todo-list'),
    todoComplete: document.querySelector('.todo-completed'),
    toDoData: [],

    render: function () {
        this.todoList.innerHTML = '';
        this.todoComplete.innerHTML = '';

        this.toDoData.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('todo-item');

            li.innerHTML = `<span class="text-todo">${item.text}</span>
              <div class="todo-buttons">
              <button class="todo-remove"></button>
              <button class="todo-complete"></button>
              </div>`;

            if (item.completed) {
                this.todoComplete.append(li);
            } else {
                this.todoList.append(li);
            }

            li.querySelector('.todo-complete').addEventListener('click', () => {
                item.completed = !item.completed;
                this.render();
            });

            li.querySelector('.todo-remove').addEventListener('click', () => {
                this.toDoData = this.toDoData.filter((todo) => todo !== item);
                this.render();
            });
        });
    },

    saveToLocalStorage: function () {
        localStorage.setItem('toDoData', JSON.stringify(this.toDoData));
    },

    loadFromLocalStorage: function () {
        const data = localStorage.getItem('toDoData');
        if (data) {
            this.toDoData = JSON.parse(data);
            this.render();
        }
    },

    handleFormSubmit: function (event) {
        event.preventDefault();

        const inputValue = this.headerInput.value.trim();
        if (inputValue === '') {
            return;
        }

        const newToDo = {
            text: inputValue,
            completed: false,
        };

        this.toDoData.push(newToDo);
        this.headerInput.value = '';
        this.saveToLocalStorage();
        this.render();
    },

    reset: function () {
        this.todoControl.removeEventListener('submit', this.handleFormSubmit);
        this.todoControl.addEventListener('submit', this.handleFormSubmit.bind(this));

        this.todoList.innerHTML = '';
        this.todoComplete.innerHTML = '';
        this.headerInput.value = '';

        const resetButton = document.getElementById('reset');
        resetButton.replaceWith(this.calculateButton);
        this.calculateButton.addEventListener('click', this.reset.bind(this));

        const inputs = document.querySelectorAll('input[type=text], select');
        inputs.forEach((input) => {
            input.disabled = false;
        });

        this.toDoData = [];
        this.saveToLocalStorage();
    },

    start: function () {
        this.loadFromLocalStorage();
        this.todoControl.addEventListener('submit', this.handleFormSubmit.bind(this));

        const calculateButton = document.getElementById('calculate');
        this.calculateButton = calculateButton;
        calculateButton.addEventListener('click', () => {
            const inputs = document.querySelectorAll('input[type=text], select');
            inputs.forEach((input) => {
                input.disabled = true;
            });

            calculateButton.style.display = 'none';

            const resetButton = document.createElement('button');
            resetButton.id = 'reset';
            resetButton.textContent = 'Reset';
            this.resetButton = resetButton;
            this.todoControl.append(resetButton);
            resetButton.addEventListener('click', this.reset.bind(this));
        });
    },
};

appData.start();
