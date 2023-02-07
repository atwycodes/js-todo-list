import menuIcon from '../assets/icons/menu.svg';

class Display {
  constructor(storage) {
    // getting tasksMain element to append list to
    this.storage = storage;
    this.tasksMain = this.getElement('#content');
    this.projectMain = this.getElement('#projects');
    this.navBar = this.getElement('.navbar__wrapper');
  }
  
  createElement (tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    } 

    return element;
  }

  getElement (selector) {
    const element = document.querySelector(selector);
    
    return element;
  }

  // Methods for displaying tasks
  populateTaskList(todos) {
    const projectTitle = this.createElement('h1', 'task-list__title');
    
    if (this.storage.currentProjectState !== '') {
      projectTitle.textContent = `${this.storage.currentProjectState}`;
    } else {
      projectTitle.textContent = 'All Tasks';
    }

    const todoList = this.createElement('ul', 'task-list__wrapper');

    this.tasksMain.append(projectTitle, todoList);

    todos.forEach((element) => { 
      const taskWrapper = this.createElement('li', 'task__wrapper');
      taskWrapper.setAttribute('data-id', element.id);

      const taskTitle = this.createElement('div', 'task__title' );
      taskTitle.textContent = element.title;
      taskTitle.setAttribute('data-id', `${element.id} title`);
      taskTitle.addEventListener('click', () => {
        if (element.complete) {
          return;
        }
        // edit task for title
        const title = this.getElement(`[data-id = '${element.id} title']`);
      
        const editTitle = this.createElement('input', 'task__edit-title');
        editTitle.setAttribute('type', 'text');
        editTitle.value = title.textContent;
        editTitle.addEventListener('blur', () => {
          this.storage.editTaskTitle(element.id, editTitle.value);

          if (this.storage.currentProjectState !== '') {  
            const filteredStorage = this.storage.todos.filter((task) => task.project === this.storage.currentProjectState);
            this.displayTasks(filteredStorage);
          } else {
            this.displayTasks(this.storage.todos);
          }
        });

        title.replaceWith(editTitle);
      });

      const toggleLabel = this.createElement('label', 'task__toggle-wrapper' );

      const taskToggle = this.createElement ('input', 'task__toggle');
      taskToggle.setAttribute('type', 'checkbox');
      taskToggle.setAttribute('data-id',`${element.id} toggle` );
      taskToggle.addEventListener('click', () => {
        this.toggleCompletionStatus(element);
        this.displayTasks(this.storage.todos);
      });
      
      const taskDueDate = this.createElement('div', 'task__due-date');
      taskDueDate.textContent = element.dueDate;
      taskDueDate.setAttribute('data-id', `${element.id} date`);
      taskDueDate.addEventListener('click', ()=> {
        if (element.complete) {
          return;
        }
        // edit task for date
        const date = this.getElement(`[data-id = '${element.id} date']`);

        const editDate = this.createElement('input', 'task__edit-due-date');
        editDate.setAttribute('type', 'date');
        editDate.value = date.textContent;
        editDate.addEventListener('input', () => {
          this.storage.editTaskDate(element.id, editDate.value);

          if (this.storage.currentProjectState !== '') {  
            const filteredStorage = this.storage.todos.filter((task) => task.project === this.storage.currentProjectState);
            this.displayTasks(filteredStorage);
          } else {
            this.displayTasks(this.storage.todos);
          }
        });

        date.replaceWith(editDate);
      });

      const taskRemoveBtn = this.createElement('button', 'task__remove-btn');
      taskRemoveBtn.textContent = 'Remove';
      taskRemoveBtn.addEventListener('click' , () => {
        this.storage.removeTask(element.id);

        if (this.storage.currentProjectState !== '') {  
          const filteredStorage = this.storage.todos.filter((task) => task.project === this.storage.currentProjectState);
          this.displayTasks(filteredStorage);
        } else {
          this.displayTasks(this.storage.todos);
        }
      });

      const taskLeftSection = this.createElement('div', 'task__left-section' );

      const taskRightSection = this.createElement('div', 'task__right-section' );

      toggleLabel.append(taskToggle);
      taskLeftSection.append(toggleLabel);
      taskLeftSection.append(taskTitle);
      taskRightSection.append(taskDueDate, taskRemoveBtn);
      taskWrapper.append(taskLeftSection,taskRightSection);
      todoList.append(taskWrapper);
    });

    const taskAddBtn = this.createElement('button', 'task__add-btn');
    taskAddBtn.textContent = 'Add a new task?';
    taskAddBtn.addEventListener('click', () => this.openAddTaskForm());

    todoList.append(taskAddBtn);
  }

  toggleCompletionStatus (task) {
    if (task.complete === false) {
      this.storage.toggleTaskComplete(task.id); 

    } else if (task.complete === true) {
      this.storage.toggleTaskIncomplete(task.id);
    }
  }

  setToggleDisplay (task) {
    this.storage.todos.forEach( (task) => {
      const toggle = this.getElement(`[data-id = '${task.id} toggle']`);
      const title = this.getElement(`[data-id = '${task.id} title']`);
      const date = this.getElement(`[data-id = '${task.id} date']`);
      if (task.complete === false) {
        toggle.checked = false;
        title.classList.remove('task-complete');
        date.classList.remove('task-complete');

      } else if (task.complete === true) {
        toggle.checked = true;
        title.classList.add('task-complete');
        date.classList.add('task-complete');
      }
    });
  }

  populateAddTaskForm() {
    const formAddWrapper = this.createElement('form', 'task-add-form__wrapper');
    formAddWrapper.append(this.createTaskFormInputElements(), this.createTaskFormAddBtns());

    this.tasksMain.append(formAddWrapper);
  } 

  createTaskFormInputElements () {
    const formInputWrapper = this.createElement('div', 'task-add-form-input__wrapper');

    const formTitle = this.createElement('input', 'task-add-form__title');
    formTitle.setAttribute('type', 'text');
    formTitle.setAttribute('placeholder', '* To do...');
    formTitle.setAttribute('required', '');

    const formDueDate = this.createElement('input', 'task-add-form__due-date');
    formDueDate.setAttribute('type', 'date');
    formDueDate.setAttribute('required', '');

    const formPriority = this.createElement('select', 'task-add-form__priority');
    
    const formLowPriority = this.createElement('option');
    formLowPriority.setAttribute('value', 'low'); 
    formLowPriority.textContent = 'Low';

    const formNormalPriority = this.createElement('option');
    formNormalPriority.setAttribute('value', 'normal'); 
    formNormalPriority.setAttribute('selected', ''); 
    formNormalPriority.textContent = 'Normal';

    const formUrgentPriority = this.createElement('option');
    formUrgentPriority.setAttribute('value', 'urgent');
    formUrgentPriority.textContent = 'Urgent';

    formPriority.append(formLowPriority, formNormalPriority, formUrgentPriority);

    formInputWrapper.append(formTitle, formDueDate, formPriority);

    return formInputWrapper;
  }

  createTaskFormAddBtns () {
    const formBtnWrapper = this.createElement('div', 'task-add-form-btn__wrapper');
    
    const formAddBtn = this.createElement('button', 'task-add-form__btn');
    formAddBtn.addEventListener('click', () => this.handleAddFormClick());
    formAddBtn.textContent = 'Add Task';
    
    const formCancelBtn = this.createElement('button', 'task-cancel-form__btn');
    formCancelBtn.addEventListener('click', () => this.closeAddTaskForm());
    formCancelBtn.textContent = 'Cancel';

    formBtnWrapper.append(formAddBtn,formCancelBtn);

    return formBtnWrapper;
  }

  displayTasks (todos) {
    // clear list on calling
    while (this.tasksMain.firstChild) {
      this.tasksMain.removeChild(this.tasksMain.firstChild);
    }
    this.populateTaskList(todos);
    this.populateAddTaskForm();
    this.setToggleDisplay();
  }

  openAddTaskForm () {
    const form = this.getElement('.task-add-form__wrapper');
    const taskAddBtn = this.getElement('.task__add-btn');
    form.style.display = 'flex';
    taskAddBtn.style.display = 'none';
  }

  closeAddTaskForm () {
    const form = this.getElement('.task-add-form__wrapper');
    const taskAddBtn = this.getElement('.task__add-btn');
    form.style.display = 'none';
    taskAddBtn.style.display = 'block';
  }

  handleAddFormClick () {
    const form = this.getElement('.task-add-form__wrapper');
    const isFormValid = form.checkValidity();

    if (!isFormValid) {
      form.reportValidity();
    } else {
      event.preventDefault();
      
      const addTitle = this.getElement('.task-add-form__title');
      const addDueDate = this.getElement('.task-add-form__due-date');
      const addPriority = this.getElement('.task-add-form__priority');
      
      this.storage.addTask(addTitle.value, addDueDate.value, addPriority.value);
      this.filterDisplayByProject();
    }
  }

  // Methods for displaying projects
  populateProjectList(projects) {
    const projectContainer = this.getElement('.projects');
    
    projects.forEach((element) => {
      const projectWrapper = this.createElement('button', 'project__wrapper');
      
      const projectName = this.createElement('div', 'project__name');
      projectName.textContent = element;
      projectName.addEventListener('click', (e) => this.handleProjectChange(e.target.parentNode, element));

      const projectRemoveBtn = this.createElement('button', 'project__remove-btn');
      projectRemoveBtn.textContent = '✖';
      projectRemoveBtn.addEventListener('click', () => {
        this.storage.removeProject(element);
        this.displayProjects(this.storage.projects);
      });

      projectWrapper.append(projectName, projectRemoveBtn);
      projectContainer.append(projectWrapper);
    }); 

    const projectAddBtn = this.createElement('button', 'project__add-btn');
    projectAddBtn.textContent = 'Add Project';
    projectAddBtn.addEventListener('click', () => this.openAddProjectForm());
    projectContainer.append(projectAddBtn);
  }

  populateAddProjectForm() {
    const formAddWrapper = this.createElement('form', 'project-add-form__wrapper');

    const formAddTitle = this.createElement('input', 'project-add-form__title');
    formAddTitle.setAttribute('type', 'text');
    formAddTitle.setAttribute('placeholder', 'Project Name...');
    formAddTitle.setAttribute('required', '');

    const formAddBtn = this.createElement('button', 'project-add-form__btn');
    formAddBtn.textContent = '+';
    formAddBtn.addEventListener('click', () => this.handleAddProject(this.storage.projects));

    const formCancelBtn = this.createElement('button', 'project-cancel-form__btn');
    formCancelBtn.textContent = 'Cancel';
    formCancelBtn.addEventListener('click', () => this.closeAddProjectForm());

    formAddWrapper.append(formAddTitle, formAddBtn, formCancelBtn);

    this.projectMain.append(formAddWrapper);
  }

  displayProjects(projects) {
    // clear list on calling
    while (this.projectMain.firstChild) {
      this.projectMain.removeChild(this.projectMain.firstChild);
    }
    this.populateProjectList(projects);
    this.populateAddProjectForm();
  }

  openAddProjectForm() {
    const form = this.getElement('.project-add-form__wrapper');
    const btn = this.getElement('.project__add-btn');
    
    btn.style.display = 'none';
    form.style.display = 'flex';
  }

  closeAddProjectForm() {
    event.preventDefault();
    const form = this.getElement('.project-add-form__wrapper');
    const btn = this.getElement('.project__add-btn');
    
    btn.style.display = 'block';
    form.style.display = 'none';
  }

  handleAddProject (projects) {
    const form = this.getElement('.project-add-form__wrapper');
    const isFormValid = form.checkValidity();

    if (!isFormValid) {
      form.reportValidity();
    } else {
      event.preventDefault();
      const title = this.getElement('.project-add-form__title');
      
      this.storage.addProject(title.value);
      this.displayProjects(projects);
    }
  }

  // Navbar setup
  populateHamburgerMenu() {
    const header = this.getElement('.header');
    const menu = this.createElement('img', 'header__menu');
    menu.src = menuIcon;
    menu.addEventListener('click', () => this.toggleNavBar());
  
    header.append(menu);
  }

  toggleNavBar() {
    const navBar = this.getElement('.navbar');

    if (navBar.classList.toString().includes('navbar-active')) {
      navBar.classList.remove('navbar-active');
    } else {
      navBar.classList.add('navbar-active');
    }
  }

  populateNavBar () {
    const allNav = this.createElement('button', 'navbar__item');
    allNav.textContent = 'All Tasks';
    allNav.addEventListener ('click', (e) => {
      this.handleProjectChange(e.target, '');
    });
    allNav.classList.add('active');
    this.navBar.append(allNav);
  }

  displayNav () {
    while (this.navBar.firstChild) {
      this.navBar.removeChild(this.navBar.firstChild);
    }
    this.populateNavBar();
  }

  // Methods for managing project state
  filterDisplayByProject() {
    if (this.storage.currentProjectState !== '') {
      const filteredArray = this.storage.todos.filter((task) => task.project === this.storage.currentProjectState);
      this.displayTasks(filteredArray);

    } else {
      this.displayTasks(this.storage.todos);
    }
  }

  handleProjectChange(e, project) {
    this.storage.setCurrentProjectState(`${project}`);
    this.filterDisplayByProject();
    this.setActive(e);
  }

  setActive(e) {
    const array = document.querySelectorAll('.active');
    array.forEach((element) => element.classList.remove('active'));
    e.classList.add('active');
  }

  initialLoad() {
    this.storage.initialLocalStorageLoad();
    this.displayNav();
    this.displayProjects(this.storage.projects);
    this.displayTasks(this.storage.todos);
    this.populateHamburgerMenu();
  }
}

export default Display;