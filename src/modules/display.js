import StorageController from './StorageController';

class DisplayController {
  static appendDisplay (array) {
    const body = document.getElementById('content');
    array.storage.forEach((element,index) => {
      const taskContainer = document.createElement('div');
      taskContainer.classList.add('task__wrapper');

      const leftTaskSection = document.createElement('div');
      leftTaskSection.classList.add('task__left-section');

      const taskTitle = document.createElement('div');
      taskTitle.classList.add('task__title');
      taskTitle.innerHTML = element.title;

      const rightTaskSection = document.createElement('div');
      rightTaskSection.classList.add('task__right-section');

      const taskDueDate = document.createElement('div');
      taskDueDate.classList.add('task__due-date');
      taskDueDate.innerHTML = element.dueDate;
      
      const removeButton = document.createElement('button');
      removeButton.innerHTML = '✖';
      removeButton.classList.add('task__remove-btn');
      removeButton.addEventListener('click', () => {
        array.removeFromStorage(index);
        this.refreshDisplay(array);
      });
      
      leftTaskSection.appendChild(taskTitle);
      rightTaskSection.appendChild(taskDueDate);
      rightTaskSection.appendChild(removeButton);

      body.appendChild(taskContainer);
      taskContainer.appendChild(leftTaskSection);
      taskContainer.appendChild(rightTaskSection);
    });
  }

  static clearDisplay (){
    const body = document.getElementById('content');

    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
  }

  static refreshDisplay(array) {
    this.clearDisplay();
    this.appendDisplay(array); 
  }
}

export default DisplayController;