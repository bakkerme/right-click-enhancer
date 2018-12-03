import registerNavigateTo from './navigate-to';
import registerInPrivateImageSave from './inprivate-image-save';
import createDebug from 'debug';

const debug = createDebug('re:plugin-bg');

const registeredPlugins = {};

function contentMessageReceived(e) {
  const { id, data } = e.data;

  if(!id)
    debug('WARNING: No id passed');

  if(typeof registeredPlugins[id] !== 'function') {
    debug(`WARNING: Plugin ${id} not registered in BG script system`);
    return;
  }

  // Execute the plugin onMessage handler
  registeredPlugins[id](data);
}

const { id: iID, onMessage: iOnMessage } = registerInPrivateImageSave();
registeredPlugins[iID] = iOnMessage;

const { id: nID, onMessage: nOnMessage } = registerNavigateTo();
registeredPlugins[nID] = nOnMessage;

console.log(registeredPlugins);

// Add the message handler to the browser to receive events from the content scripts
browser.runtime.onMessage.addListener(contentMessageReceived);
