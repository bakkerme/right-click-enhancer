import urlRegex from 'url-regex';
import createDebug from 'debug';

const debug = createDebug('nt:general');
let isNavigating = false;

browser.runtime.onMessage.addListener(contentMessageReceived);

function contentMessageReceived(e) {
  const { data: highlightedText } = e;

  debug('Got a message!');
  debug(`Text highligted is: ${highlightedText}`);

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
      contexts: ["all"],
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