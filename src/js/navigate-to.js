import urlRegex from 'url-regex';
let hasMenu = false;

browser.runtime.onMessage.addListener(contentMessageReceived);

function contentMessageReceived(e) {
  const { data } = e;
  console.log('Got a message!');
  console.log(data);

  if (!data) {
    hasMenu = false;
    browser.contextMenus.removeAll();
    return;
  }

  const isURL = urlRegex().test(data);
  if (isURL) {
    hasMenu = true;
    browser.contextMenus.create({
      id: "remove-me",
      title: "Navigate To",
      contexts: ["all"]
    }, onClicked);
  }
}

function onClicked() {
      console.log("test");
      console.log("test2");
    }

// "default_icon": {
// "20": "images/color-changer20.png",
// "40": "images/color-changer40.png"
// },