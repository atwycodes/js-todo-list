import Task from './modules/Task';
import StorageController from './modules/StorageController';
import DisplayController from './modules/display';
import './style.scss';

const x = new Task ('Meet Bob', 'For lunch at 2PM');
const y = new Task ('Meet Andrew', 'For gym at 3PM', '18/01/2023', 'urgent','gym');
const z = new Task ('Meet edwrd', 'For gym at 3PM', '18/01/2023', 'urgent','gym');

const array = new StorageController();

array.addToStorage(x);
array.addToStorage(y);
array.addToStorage(z);


DisplayController.refreshDisplay(array.storage);
array.printStorage();





// filter by project name ie: 'gym'
// project class? 
// let x = new Project (category)

const result = array.filterCategory('gym');
DisplayController.refreshDisplay(result);

console.table(result);

