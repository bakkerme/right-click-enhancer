browser.runtime.onMessage.addListener(contentMessageRecieved);

function contentMessageRecieved(e) {
  console.log('Got a message!');
  // if(text !== '') {
    
  // } else {
  //   browser.contextMenus.removeAll();
  // }
}
// browser.contextMenus.create({
//       id: "remove-me",
//       title: "Navigate To",
//       contexts: ["all"]
//     }, onClicked);

//     function onClicked() {
//       console.log("test");
//       console.log("test2");
//     }


// "default_icon": {
      // "20": "images/color-changer20.png",
      // "40": "images/color-changer40.png"
    // },

  // "content_scripts": [{
        // "matches": [
                  // "<all_urls>"
              // ],
        // "js": ["js/content.js"],
        // "run_at": "document_end"
  // }]
