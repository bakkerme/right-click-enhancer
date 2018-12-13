import { NAVIGATE_TO } from '../plugins';
import { buildMessage, sendMessage } from './utils';
import { getBrowserObject } from '../utils';

const browser = getBrowserObject();

function highlightHandler(e) {
  const highlightedText = document.getSelection().toString();
  if (highlightedText !== '') {
    sendMessage(buildMessage(NAVIGATE_TO, highlightedText));
  } else {
    sendMessage(buildMessage(NAVIGATE_TO, null));
  }
}

export default function start() {
  document.onmouseup = highlightHandler;
}
