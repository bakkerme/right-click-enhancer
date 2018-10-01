browser.contextMenus.create({
    id: "remove-me",
    title: "Navigate To",
    contexts: ["all"]
}, onCreated);

function onCreated() {
  console.log("test");
}

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
