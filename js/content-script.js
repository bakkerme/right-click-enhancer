document.onmouseup = highlightHandler;

function highlightHandler(e) {
  console.log("onup");
  const highlightedText = document.getSelection();
  if(highlightedText !== '') {
      browser.runtime.sendMessage(null, {data: highlightedText});
  } else {
      browser.runtime.sendMessage(null, {data: null});
  }
}

