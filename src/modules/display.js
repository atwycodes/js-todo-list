import StorageController from './StorageController';

class DisplayController {
  static appendDisplay (array) {
    const body = document.getElementById('content');
    array.storage.forEach((element,index) => {
      const taskContainer = document.createElement('div');
      taskContainer.classList.add('container');

      const taskTitle = document.createElement('div');
      taskTitle.innerHTML = element.title;

      const taskDueDate = document.createElement('div');
      taskDueDate.innerHTML = element.dueDate;
      
      const removeButton = document.createElement('button');
      removeButton.innerHTML = 'Remove';
      removeButton.addEventListener('click', () => {
        array.removeFromStorage(index);
        this.refreshDisplay(array);
      });
      
      body.appendChild(taskContainer);
      taskContainer.appendChild(taskTitle);
      taskContainer.appendChild(taskDueDate);
      taskContainer.appendChild(removeButton);
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