class Task {
  constructor (title, description = '', dueDate = new Date().toLocaleDateString('en-MY'), priority = 'normal', category = 'home') {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;

    this.category = category;
  }
}

export default Task;