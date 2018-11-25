import urlRegex from 'url-regex';
import createDebug from 'debug';
import { NAVIGATE_TO } from '../plugins';

const debug = createDebug('nt:general');
let isNavigating = false;

function contentMessageReceived(e) {
  const highlightedText = e;

  debug('Got a message!');
  debug(`Text highlighted is: ${highlightedText}`);

  // Starting the process, ensure the system knows we aren't navigating
  isNavigating = false;

  // Clear the menus if the user has unselected the url
  if (!highlightedText) {
    browser.contextMenus.removeAll();
    return;
  }

  const isURL = urlRegex(true).test(highlightedText);
  if (isURL) {
    debug("The user has highlighted a URL");
    const url = highlightedText.trim(); // Clear any spaces or linebreaks
    const onContextMenuItemClick = onClicked(url);
    browser.contextMenus.create({
      id: "navigate-to",
      title: `Navigate to "${url}"`,
      contexts: ["selection"],
      onclick: onContextMenuItemClick,
    });
  }
}

const onClicked = (url) => () => {
  if(!isNavigating) {
    debug(`Navigating to: ${url}`);
    browser.tabs.create({ url });
    browser.contextMenus.removeAll();

    isNavigating = true;
  }
}

export default function registerPlugin() {
  return {
    id: NAVIGATE_TO,
    onMessage: contentMessageReceived
  };
}
