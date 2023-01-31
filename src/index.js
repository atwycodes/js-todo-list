import Display from './modules/Display';
import Storage from './modules/Storage';
import './style.scss';

const app = new Display(new Storage());
app.initialLoad();