import { format, parseISO } from 'date-fns';

class Storage {
  constructor() {
    this.todos = [
      {
        id: crypto.randomUUID(),
        title: 'Finish todo list project',
        dueDate: '3 Feb 2023',
        priority: 'normal',
        project: 'Odin',
        complete: false
      },

      {
        id: crypto.randomUUID(),
        title: 'Take the dog out for a walk',
        dueDate: '4 Feb 2023',
        priority: 'normal',
        project: 'Dog',
        complete: false
      }
    ];

    this.projects = [
      'Odin', 'Dog'
    ];

    this.currentProjectState = '';
  }

  initialLocalStorageLoad () {
    if (!localStorage.initialLoad) {
      localStorage.setItem('initialLoad', true);
      localStorage.setItem('todos', JSON.stringify(this.todos));
      localStorage.setItem('projects', JSON.stringify(this.projects));

    } else {
      this.todos = JSON.parse(localStorage.getItem('todos'));
      this.projects = JSON.parse(localStorage.getItem('projects'));
    }
  }

  setTodosToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  setProjectsToLocalStorage() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  addTask (title, dueDate, priority) {
    const task = {
      id: crypto.randomUUID(),      
      title, 
      dueDate: format(parseISO(dueDate), 'dd MMM yyyy'),
      priority,
      project: this.currentProjectState,
      complete: false
    };
    this.todos.push(task); 
    this.setTodosToLocalStorage();
  }

  removeTask (id) {
    this.todos = this.todos.filter((task) => task.id !== id );
    this.setTodosToLocalStorage();
  }

  editTaskTitle (id, title) {
    this.todos = this.todos.map ((task) => task.id === id ? 
      {
        id: task.id,
        title,
        dueDate: task.dueDate,
        priority: task.priority,
        project: task.project,
        complete: task.complete
      } 
      : task
    );
    this.setTodosToLocalStorage();
  }

  editTaskDate (id, dueDate) {
    this.todos = this.todos.map ((task) => task.id === id ? 
      {
        id: task.id,
        title: task.title,
        dueDate: format(parseISO(dueDate), 'dd MMM yyyy'),
        priority: task.priority,
        project: task.project,
        complete: task.complete
      } 
      : task
    );
    this.setTodosToLocalStorage();
  }

  toggleTaskComplete (id) {
    this.todos = this.todos.map((task) => task.id === id ? 
      {
        id: task.id,
        title: task.title,
        dueDate: task.dueDate,
        priority: task.priority,
        project: task.project,
        complete: true 
      } 
      : task
    );
    this.setTodosToLocalStorage();
  }

  addProject (project) {
    if (this.projects.includes(project)) {
      alert (`You already have a project titled ${project}`);

    } else {
      this.projects.push(project); 
      this.setProjectsToLocalStorage();
    }
  }

  removeProject (project) {
    this.projects = this.projects.filter((element) => element !== project);
    this.setProjectsToLocalStorage();
  }

  setCurrentProjectState (projectState) {
    this.currentProjectState = projectState;
  }
}

export default Storage;
