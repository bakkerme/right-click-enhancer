import registerNavigateTo from './navigate-to';
import registerInPrivateImageSave from './inprivate-image-save';
import createDebug from 'debug';

const debug = createDebug('nt:plugin-bg');

const registeredPlugins = {};

function contentMessageReceived(e) {
  const { id, data } = e.data;

  if(!id)
    debug('WARNING: No id passed');

  if(typeof registeredPlugins[id] !== 'function')
    debug(`WARNING: Plugin ${id} not registered in BG script system`);

  // Execute the plugin onMessage handler
  registeredPlugins[id](data);
}

// const { id: nID, onMessage: nOnMessage }= registerNavigateTo();
const { id: iID, onMessage: iOnMessage }= registerInPrivateImageSave();
// registeredPlugins[nID] = nOnMessage;
registeredPlugins[iID] = iOnMessage;

// Add the message handler to the browser to receive events from the content scripts
browser.runtime.onMessage.addListener(contentMessageReceived);
