import { JSDOM } from 'jsdom'
import 'babel-polyfill'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

global.dom = jsdom
global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}

Enzyme.configure({ adapter: new Adapter() });
