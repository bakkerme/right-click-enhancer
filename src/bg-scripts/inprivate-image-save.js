import createDebug from 'debug';
import { INPRIVATE_IMAGE_SAVE } from '../plugins';
import { getBrowserObject } from '../utils';

const debug = createDebug('rt:ip:general');
const browser = getBrowserObject();

const onSaveClicked = (e) => {
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currId = tabs[0].id;
    browser.tabs.sendMessage(currId, {
      srcUrl: e.srcUrl,
    });
  });
};

const onNewTabClicked = (e) => {
  browser.tabs.create({ url: e.srcUrl });
};

const startPlugin = () => {
  debug('Adding InPrivate Image Save menu item');
  browser.contextMenus.create({
    id: 'inprivate-image-save',
    title: 'Save original image',
    contexts: ['image'],
    onclick: onSaveClicked,
  });
  browser.contextMenus.create({
    id: 'inprivate-image-new-tab',
    title: 'Open image in new tab',
    contexts: ['image'],
    onclick: onNewTabClicked,
  });
};

export default function registerPlugin() {
  startPlugin();
  return {
    id: INPRIVATE_IMAGE_SAVE,
    onMessage: _ => _,
  };
}
