import { format, parseISO } from 'date-fns';
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

      const taskTitle = this.createElement('div', 'task__title' );
      taskTitle.textContent = element.title;
      
      const taskDueDate = this.createElement('div', 'task__due-date');
      taskDueDate.textContent = element.dueDate;
      
      const taskEditBtn = this.createElement('button', 'task__edit-btn');
      taskEditBtn.textContent = 'Edit';

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

      taskLeftSection.append(taskTitle);
      taskRightSection.append(taskDueDate, taskEditBtn, taskRemoveBtn);
      taskWrapper.append(taskLeftSection,taskRightSection);
      todoList.append(taskWrapper);
    });

    const taskAddBtn = this.createElement('button', 'task__add-btn');
    taskAddBtn.textContent = 'Add a new task?';
    taskAddBtn.addEventListener('click', () => this.openAddTaskForm());

    todoList.append(taskAddBtn);
  }

  populateAddTaskForm() {
    const formAddWrapper = this.createElement('form', 'task-add-form__wrapper');
    const formBtnWrapper = this.createElement('div', 'task-add-form-btn__wrapper');
    const formInputWrapper = this.createElement('div', 'task-add-form-input__wrapper');

    const formAddTitle = this.createElement('input', 'task-add-form__title');
    formAddTitle.setAttribute('type', 'text');
    formAddTitle.setAttribute('placeholder', '* To do...');
    formAddTitle.setAttribute('required', '');

    const formAddDueDate = this.createElement('input', 'task-add-form__due-date');
    formAddDueDate.setAttribute('type', 'date');
    formAddDueDate.setAttribute('required', '');

    const formAddPriority = this.createElement('select', 'task-add-form__priority');
    
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

    formAddPriority.append(formLowPriority, formNormalPriority, formUrgentPriority);

    const formAddBtn = this.createElement('button', 'task-add-form__btn');
    formAddBtn.addEventListener('click', () => this.handleAddFormClick());
    formAddBtn.textContent = 'Add Task';

    const formCancelBtn = this.createElement('button', 'task-cancel-form__btn');
    formCancelBtn.addEventListener('click', () => this.closeAddTaskForm());
    formCancelBtn.textContent = 'Cancel';

    formInputWrapper.append(formAddTitle, formAddDueDate, formAddPriority);
    formBtnWrapper.append(formAddBtn,formCancelBtn);
    formAddWrapper.append(formInputWrapper, formBtnWrapper);

    this.tasksMain.append(formAddWrapper);
  }

  displayTasks (todos) {
    // clear list on calling
    while (this.tasksMain.firstChild) {
      this.tasksMain.removeChild(this.tasksMain.firstChild);
    }
    this.populateTaskList(todos);
    this.populateAddTaskForm();
  }

  openAddTaskForm () {
    const form = this.getElement('.task-add-form__wrapper');
    const taskAddBtn = this.getElement('.task__add-btn');
    form.style.display = 'flex';
    taskAddBtn.style.display = 'none';
    console.log('opened form, hide + button');
  }

  closeAddTaskForm () {
    const form = this.getElement('.task-add-form__wrapper');
    const taskAddBtn = this.getElement('.task__add-btn');
    form.style.display = 'none';
    taskAddBtn.style.display = 'block';
    console.log('close form, show + button');
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
      
      this.storage.addTask(addTitle.value, format(parseISO(addDueDate.value), 'dd MMM yyyy'), addPriority.value);
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
      console.log('form add button clicked');
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
    menu.addEventListener('click', () => this.openNavBar());
  
    header.append(menu);
  }

  openNavBar() {
    console.log('hamburger pls');
    const navBar = this.getElement('.navbar');
    console.log(navBar.style.display);

    if (navBar.style.display === 'flex') {
      navBar.style.display = 'none';
    } else {
      navBar.style.display = 'flex';
    }
  }

  closeNavBar() {

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
    this.displayNav();
    this.displayProjects(this.storage.projects);
    this.displayTasks(this.storage.todos);
    this.populateHamburgerMenu();
  }
}

export default Display;