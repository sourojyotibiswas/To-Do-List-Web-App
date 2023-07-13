window.addEventListener('load', () => {

	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

document.addEventListener('DOMContentLoaded', function() {
    var greetingElement = document.getElementById("greeting");
    var nameForm = document.getElementById("nameForm");

    // Retrieve values from local storage if they exist
    var storedName = localStorage.getItem("name");
    var storedGreeting = localStorage.getItem("greeting");

    // Check if values exist in local storage
    if (storedName && storedGreeting) {
        greetingElement.innerHTML = storedGreeting;
        nameForm.style.display = "none";
    }

    nameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var nameInput = document.getElementById("name");
        var name = nameInput.value || "User";

        var currentTime = new Date();
        var currentHour = currentTime.getHours();
        var greeting;

        if (currentHour < 12) {
            greeting = "Good morning";
        } else if (currentHour < 18) {
            greeting = "Good afternoon";
        } else {
            greeting = "Good evening";
        }

        greetingElement.innerHTML = greeting + ", " + name + "!";
        nameForm.style.display = "none";

        // Store values in local storage
        localStorage.setItem("name", name);
        localStorage.setItem("greeting", greeting + ", " + name + "!");
    });
});

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('professional');
		}

        content.classList.add('todo-content');

		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

        if (todo.category == 'personal') {
			content.innerHTML = `<input type="text" value="${todo.content}" style="color: #ff7f50" readonly>`;
		} else {
			content.innerHTML = `<input type="text" value="${todo.content}" style="color: #3a82ee" readonly>`;
		}
		
		edit.innerHTML = `<img src="iconsedit.png" style="width: 1.5625rem; height: 1.5625rem;" />`;
		deleteButton.innerHTML = `<img src="iconsdel.png" style="width: 1.625rem; height: 1.625rem;" />`;

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}