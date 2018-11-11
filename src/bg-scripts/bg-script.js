import registerNavigateTo from './navigate-to';
import createDebug from 'debug';

const debug = createDebug('nt:plugin-bg');

const registeredPlugins = {};

function contentMessageReceived(e) {
  const { id, data } = e.data;

  if(!id)
    debug('WARNING: No id passed');

  // Execute the plugin onMessage handler
  registeredPlugins[id](data);
}

const { id: nID, onMessage: nOnMessage }= registerNavigateTo();
registeredPlugins[nID] = nOnMessage;

// Add the message handler to the browser to receive events from the content scripts
browser.runtime.onMessage.addListener(contentMessageReceived);