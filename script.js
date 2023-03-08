'use strict';

let currentTodos = [
  { id: 1, title: 'HTML', completed: true },
  { id: 2, title: 'CSS', completed: true },
  { id: 3, title: 'JavaScript', completed: false },
];

const root = document.querySelector('.todoapp');
const newTodoField = root.querySelector('.new-todo');
const itemsList = root.querySelector('.todo-list');
const allToggler = root.querySelector('.toggle-all');
const clearCompletedButton = root.querySelector('.clear-completed');
const filter = root.querySelector('.filters');

initTodos(currentTodos);

function initTodos(todos) {
  todos.forEach(todo => {
    itemsList.insertAdjacentHTML('beforeend', `
      <li
       class="todo-item ${todo.completed ? 'completed' : ''}"
       data-todo-id="${todo.id}"
      >
        <input 
          id="todo-${todo.id}"
          class="toggle" 
          type="checkbox"
          ${todo.completed ? 'checked' : ''}
        >
        <label for="todo-${todo.id}">${todo.title}</label>
        <button class="destroy"></button>
        </li>
        `);
      });
      
      updateInfo();
}
// Update info
function updateInfo() {
  const completedTogglers = root.querySelectorAll('.toggle:checked');
  const activeTogglers = root.querySelectorAll('.toggle:not(:checked)');
  const counter = root.querySelector('.todo-count');
  const footer = root.querySelector('.footer');
  const toggleAllContainer = root.querySelector('.toggle-all-container');

  counter.innerHTML = `${activeTogglers.length} items left`;
  allToggler.checked = activeTogglers.length === 0;
  clearCompletedButton.hidden = completedTogglers.length === 0;

  const hasTodos = completedTogglers.length > 0 || activeTogglers.length > 0;
  footer.hidden = !hasTodos;
  toggleAllContainer.hidden = !hasTodos;

  console.log(currentTodos);
};
// Add todo
newTodoField.addEventListener('keydown', e => {
  if (e.key !== 'Enter') {
    return;
  }
  
  if (!newTodoField.value) {
    return;
  }

  const id = +new Date();
  currentTodos.push({
    id: id,
    title: newTodoField.value,
    completed: false,
  });

  itemsList.insertAdjacentHTML('beforeend', `
    <li class="todo-item" data-todo-id="${id}">
      <input id="todo-${id}" class="toggle" type="checkbox">
      <label for="todo-${id}">${newTodoField.value}</label>
      <button class="destroy"></button>
    </li>
  `);

  newTodoField.value = '';

  updateInfo();
});
// Remove todo
itemsList.addEventListener('click', e => {
  if (!e.target.matches('.destroy')) {
    return;
  }

  const item = e.target.closest('.todo-item');
  item.remove();

  currentTodos = currentTodos.filter(todo => todo.id !== +item.dataset.todoId)
  updateInfo();
});
// Toggle todo status
itemsList.addEventListener('change', e => {
  if (!e.target.matches('.toggle')) {
    return;
  }

  const item = e.target.closest('.todo-item');

  item.classList.toggle('completed', e.target.checked);
  const selectedTodo = currentTodos.find(todo => todo.id === +item.dataset.todoId);
  selectedTodo.completed = e.target.checked;

  updateInfo();
});
// Filters
filter.addEventListener('click', e => {
  if (!e.target.dataset.filter) {
    return;
  }

  const filterButtons = root.querySelectorAll('[data-filter]');

  filterButtons.forEach(button => {
    button.classList.toggle('selected', e.target === button);
  });

  const togglers = root.querySelectorAll('.toggle');

  togglers.forEach(toggler => {
    const item = toggler.closest('.todo-item');

    switch(e.target.dataset.filter) {
      case 'all':
        item.hidden = false;
      break;

      case 'active': 
        item.hidden = toggler.checked;
      break;

      case 'completed':
        item.hidden = !toggler.checked;
      break;
    }
  });
});
// Clear completed
clearCompletedButton.addEventListener('click', () => {
  const completedTogglers = root.querySelectorAll('.toggle:checked');

  completedTogglers.forEach(toggler => {
    toggler.closest('.todo-item').remove();
  });
  
  currentTodos = currentTodos.filter(todo => !todo.completed);

  updateInfo();
});
// Toggle all
allToggler.addEventListener('change', () => {
  const togglers = root.querySelectorAll('.toggle');

  togglers.forEach(toggler => {
    toggler.checked = allToggler.checked;
    toggler.closest('.todo-item').classList.toggle('completed', allToggler.checked);
  });

  currentTodos.forEach(todo => {
    todo.completed = allToggler.checked;
  });

  updateInfo();
});