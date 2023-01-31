class Storage {
  constructor() {
    this.todos = [
      {
        id: crypto.randomUUID(),
        title: 'Open/Closing of Forms (All)',
        dueDate: '26 Jan 2023',
        priority: 'normal',
        project: '',
        complete: false
      },

      {
        id: crypto.randomUUID(),
        title: 'Cleaning up Design (Dog)',
        dueDate: '26 Jan 2023',
        priority: 'normal',
        project: 'Dog',
        complete: false
      }
    ];

    this.projects = [
      'Gym', 'Dog', 'Test'
    ];

    this.currentProjectState = '';
  }

  addTask (title, dueDate, priority) {
    const task = {
      id: crypto.randomUUID(),      
      title, 
      dueDate,
      priority,
      project: this.currentProjectState,
      complete: false
    };
    this.todos.push(task); 
  }

  removeTask (id) {
    this.todos = this.todos.filter((task) => task.id !== id );
  }

  editTask (id, title, dueDate, priority) {
    this.todos = this.todos.map ((task) => task.id === id ? 
      {
        id: task.id,
        title,
        dueDate,
        priority,
        project: task.project,
        complete: task.complete
      } 
      : task
    );
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
  }

  addProject (project) {
    if (this.projects.includes(project)) {
      alert (`You already have a project titled ${project}`);

    } else {
      this.projects.push(project); 
    }
  }

  removeProject (project) {
    this.projects = this.projects.filter((element) => element !== project);
  }

  setCurrentProjectState (projectState) {
    this.currentProjectState = projectState;
  }
}

export default Storage;
