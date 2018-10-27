document.onmouseup = highlightHandler;

let lastHighlight;
function highlightHandler(e) {
  console.log("onup");
  const highlightedText = document.getSelection();
  if(highlightedText !== '') {
      console.log('text');
      console.log(highlightedText);
      browser.runtime.sendMessage(null, {data: highlightedText.toString()});
  } else {
      console.log('no text');
      browser.runtime.sendMessage(null, {data: null});
  }
}