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

function addSaveImage(e) {
  debugger;
  sendMessage(buildMessage(INPRIVATE_IMAGE_SAVE, {}));
}

export default function start() {
  const documentImages = document.images;
  for (i = 0; i < documentImages.length; ++i) {
    const el = documentImages[i];
    el.addEventListener('contextmenu', function (e) {
      e.preventDefault();
      addSaveImage(e);
    }, false);
  }
}