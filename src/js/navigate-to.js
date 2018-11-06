import urlRegex from 'url-regex';
let isNavigating = false;

browser.runtime.onMessage.addListener(contentMessageReceived);

function contentMessageReceived(e) {
  const { data: highlightedText } = e;
  console.log('Got a message!');
  console.log(highlightedText);

  isNavigating = false;

  if (!highlightedText) {
    browser.contextMenus.removeAll();
    return;
  }

  const isURL = urlRegex(true).test(highlightedText);
  if (isURL) {
    const onContextMenuItemClick = onClicked(highlightedText.trim());
    browser.contextMenus.create({
      id: "remove-me",
      title: `Navigate to "${highlightedText}"`,
      contexts: ["all"],
      onclick: onContextMenuItemClick
    });
  }
}

const onClicked = (url) => () => {
  if(!isNavigating) {
    console.log("Navigating to: " + url);
    browser.tabs.create({ url });
    browser.contextMenus.removeAll();

    isNavigating = true;
  }
}

// "default_icon": {
// "20": "images/color-changer20.png",
// "40": "images/color-changer40.png"
// },