import { INPRIVATE_IMAGE_SAVE } from '../plugins';
import { buildMessage, sendMessage } from './utils';

function saveImage(e) {
  debugger;
  const filename = this.src.substring(this.src.lastIndexOf("/") + 1);

  const xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function () {
    // xhr.response is a Blob
    const url = URL.createObjectURL(xhr.response);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    const e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
    window.URL.revokeObjectURL(url);
  };

  xhr.open('GET', this.src);
  xhr.send();
}

function addSaveImage(elem) {
  console.error(`Adding save for ${elem}`);
  sendMessage(buildMessage(INPRIVATE_IMAGE_SAVE, { src: elem.src }));
}

export default function start() {
  document.addEventListener('contextmenu', function (e) {
    const x = event.clientX, y = event.clientY;
    const elementMouseIsOver = document.elementFromPoint(x, y);
    if(elementMouseIsOver && elementMouseIsOver.tagName === "IMG") {
      addSaveImage(elementMouseIsOver);
    }
  });
}