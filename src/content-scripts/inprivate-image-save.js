import { INPRIVATE_IMAGE_SAVE } from '../plugins';
import { buildMessage, sendMessage } from './utils';

browser.runtime.onMessage.addListener(request => {
  saveImage(request.srcUrl);
});

// Based on https://github.com/PixelsCommander/Download-File-JS
function saveImage(srcUrl) {
  //Creating new link node.
  var link = document.createElement('a');
  link.href = srcUrl;

  if (link.download !== undefined) {
    //Set HTML5 download attribute. This will prevent file from opening if supported.
    var fileName = srcUrl.substring(srcUrl.lastIndexOf('/') + 1, srcUrl.length);
    link.download = fileName;
  }

  //Dispatching click event.
  if (document.createEvent) {
    const e = document.createEvent('MouseEvents');
    e.initEvent('click', true, true);
    link.dispatchEvent(e);
    return true;
  }
}

export default function start() { }
