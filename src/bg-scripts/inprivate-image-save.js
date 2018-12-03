import { INPRIVATE_IMAGE_SAVE } from '../plugins';
import createDebug from 'debug';
const debug = createDebug('rt:ip:general');

const onClicked = (e) => {
  browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const currId = tabs[0].id;
    browser.tabs.sendMessage(currId, {
      srcUrl: e.srcUrl
    });
  })
}

const startPlugin = () => {
  debug('Adding InPrivate Image Save menu item');
  browser.contextMenus.create({
    id: "inprivate-image-save",
    title: 'Save original image',
    contexts: ["image"],
    onclick: onClicked
  });
}

export default function registerPlugin() {
  startPlugin();
  return {
    id: INPRIVATE_IMAGE_SAVE,
    onMessage: _ => _
  };
}
