import * as $ from 'jquery';
global['$'] = global['jQuery'] = $;

import framesList from "../components/frames-list";

let testobject = new framesList();
testobject.start(jest.fn);

describe('Creation', () => {
  expect(testobject.framesCount).toBe(1);
  expect(testobject.framesCount).toBe(testobject.list.length);
  expect(testobject.list[0]).toBe(window.globalState.currentFrame);
});

test('Add frame', () => {

});
