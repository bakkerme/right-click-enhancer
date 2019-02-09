import { NAVIGATE_TO } from '../plugins';
import { buildMessage, sendMessage } from './utils';

function highlightHandler() {
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
