// This is the array that will hold the todo list items
let todoItems = [];

function renderTodo(todo) {
  const list = document.querySelector('.js-todo-list');
  // select the current todo item in the DOM
  const item = document.querySelector(`[data-key='${todo.id}']`);

  const isChecked = todo.checked ? 'done': '';
  const node = document.createElement("li");
  node.setAttribute('class', `todo-item ${isChecked}`);
  node.setAttribute('data-key', todo.id);
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  // If the item already exists in the DOM
  if (item) {
    // replace it
    list.replaceChild(node, item);
  } else {
    // otherwise append it to the end of the list
    list.append(node);
  }
}


// This function will create a new todo object based on the
// text that was entered in the text input, and push it into
// the `todoItems` array
function addTodo(text) {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };

  todoItems.push(todo);
  renderTodo(todo);
}

function toggleDone(key) {
  // findIndex is an array method that returns the position of an element
  // in the array.
  const index = todoItems.findIndex(item => item.id === Number(key));
  // Locate the todo item in the todoItems array and set its checked
  // property to the opposite. That means, `true` will become `false` and vice
  // versa.
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

// Select the form element
const form = document.querySelector('.js-form');

// Add a submit event listener
form.addEventListener('submit', (event) => {
  // prevent page refresh on form submission
  event.preventDefault();
  // select the text input
  const input = document.querySelector('.js-todo-input');

  // Get the value of the input and remove whitespace
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
    input.focus();
  }
});

// Select the entire list
const list = document.querySelector('.js-todo-list');
// Add a click event listener to the list and its children
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
});
