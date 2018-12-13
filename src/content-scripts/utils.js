function buildMessage(id, data) {
  return {
    data: {
      id, data,
    },
  };
}

function sendMessage(data) {
  browser.runtime.sendMessage(null, data);
}

export {
  buildMessage,
  sendMessage,
};
