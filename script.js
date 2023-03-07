'use strict';

const root = document.querySelector('.todoapp');

const newTodoField = root.querySelector('.new-todo');
const itemsList = root.querySelector('.todo-list');
const allToggler = root.querySelector('.toggle-all');

function updateInfo() {
  const notCompletedTogglers = root.querySelectorAll('.toggle:not(:checked)');
  const counter = root.querySelector('.todo-count');
  
  counter.innerHTML = `${notCompletedTogglers.length} items left`;

  allToggler.checked = notCompletedTogglers.length === 0;
};

allToggler.addEventListener('change', () => {
  const togglers = root.querySelectorAll('.toggle');

    togglers.forEach(toggler => {
      toggler.checked = allToggler.checked;
      toggler.closest('.todo-item').classList.toggle('completed', allToggler.checked);
    });
});

newTodoField.addEventListener('keydown', e => {
  if (e.key !== 'Enter') {
    return;
  }

  if (!newTodoField.value) {
    return;
  }

  const id = +new Date();

  itemsList.insertAdjacentHTML('beforeend', `
  <li class="todo-item">
    <input id="todo-${id}" class="toggle" type="checkbox">
    <label for="todo-${id}">${newTodoField.value}</label>
    <button class="destroy"></button>
  </li>
  `);

  newTodoField.value = '';

  updateInfo();
});

itemsList.addEventListener('click', e => {
  if (!e.target.matches('.destroy')) {
    return;
  }

  e.target.closest('.todo-item').remove();
  updateInfo();
});

itemsList.addEventListener('change', e => {
  if (!e.target.matches('.toggle')) {
    return;
  }

  e.target.closest('.todo-item').classList.toggle('completed', e.target.checked);
  updateInfo();
});