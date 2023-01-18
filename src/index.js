import Task from './modules/Task';
import StorageController from './modules/StorageController';
import DisplayController from './modules/display';
import './style.scss';

const x = new Task ('Meet Bob', 'For lunch at 2PM');
const y = new Task ('Meet Andrew', 'For gym at 3PM', '18/01/2023', 'urgent','gym');
const z = new Task ('Meet Edward', 'For gym at 6PM', '20/01/2023', 'urgent','gym');

// default behaviour
const arrayDefault = new StorageController();

arrayDefault.addToStorage(x);
arrayDefault.addToStorage(y);
arrayDefault.addToStorage(z);


DisplayController.refreshDisplay(arrayDefault);
arrayDefault.printStorage();



// // logic for when a user makes a new project (filters)
// const filteredArray = new StorageController(arrayDefault.filterCategory('gym'));

// DisplayController.refreshDisplay(filteredArray);

// console.table(filteredArray.storage);

