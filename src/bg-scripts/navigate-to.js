import urlRegex from 'url-regex';
import createDebug from 'debug';
import { getBrowserObject } from '../utils';
import { NAVIGATE_TO } from '../plugins';

const browser = getBrowserObject();

const debug = createDebug('rt:nt:general');
let isNavigating = false;

const onClicked = url => () => {
  if (!isNavigating) {
    debug(`Navigating to: ${url}`);
    browser.tabs.create({ url });
    browser.contextMenus.removeAll();

    isNavigating = true;
  }
};

function contentMessageReceived(e) {
  const highlightedText = e;

  debug('Got a message!');
  debug(`Text highlighted is: ${highlightedText}`);

  // Starting the process, ensure the system knows we aren't navigating
  isNavigating = false;

  // Clear the menu if the user has unselected the url
  if (!highlightedText) {
    browser.contextMenus.remove('navigate-to');
    return;
  }

  const isURL = urlRegex(true).test(highlightedText);
  if (isURL) {
    debug('The user has highlighted a URL');
    const url = highlightedText.trim(); // Clear any spaces or linebreaks
    const onContextMenuItemClick = onClicked(url);
    browser.contextMenus.create({
      id: 'navigate-to',
      title: `Open "${url}"`,
      contexts: ['selection'],
      onclick: onContextMenuItemClick,
    });
  }
}

export default function registerPlugin() {
  return {
    id: NAVIGATE_TO,
    onMessage: contentMessageReceived,
  };
}
