import PiskelApp from './app'

import canvasCreator from './components/modal-dialog/index.js';

let app = new PiskelApp(32, 32, document);

let create_window = new canvasCreator(app.start.bind(app));

create_window.start();
app.dev();


