const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><input id="test" />');
global.document = dom.window.document;
global.window = dom.window;
const flatpickr = require('flatpickr');
const monthSelectPlugin = require('flatpickr/dist/plugins/monthSelect');
try {
  flatpickr(document.getElementById('test'), {
    mode: 'range',
    plugins: [monthSelectPlugin({})]
  });
  console.log("Success");
} catch (e) {
  console.log(e.name, e.message);
}
