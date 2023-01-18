class DisplayController {

  static appendDisplay (array) {
    const body = document.getElementById('content');
    
    array.forEach((element,index) => {
      
      const toDoContainer = document.createElement('div');
      toDoContainer.classList.add('container');

      const toDoTitle = document.createElement('div');
      toDoTitle.innerHTML = element.title;

      const toDoDueDate = document.createElement('div');
      toDoDueDate.innerHTML = element.dueDate;
      
      const removeButton = document.createElement('button');
      removeButton.innerHTML = 'Remove';
      removeButton.addEventListener('click', () => {
        array.removeFromStorage(index);
        this.refreshDisplay(array);
      });
      
      body.appendChild(toDoContainer);
      toDoContainer.appendChild(toDoTitle);
      toDoContainer.appendChild(toDoDueDate);
      toDoContainer.appendChild(removeButton);
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