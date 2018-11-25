import { INPRIVATE_IMAGE_SAVE } from '../plugins';

function contentMessageReceived(e) {
  console.error(e);
  // const { src } = e;

  // if (!src) {
    // console.error('Removing InPrivate Save Original menu');
    // browser.contextMenus.removeAll();
    // return;
  // }

  // console.error('Creating context menu item');
}

const onClicked = (e) => {
  console.log(e);
  // browser.contextMenus.removeAll();
  // console.error('Clicked Save!');
}

const startPlugin = () => {
  // const onContextMenuItemClick = onClicked(src);
  browser.contextMenus.create({
    id: "inprivate-image-save",
    title: 'Save original image',
    contexts: ["image"],
    onclick: onClicked
  });
}

export default function registerPlugin() {
  startPlugin();
  return {
    id: INPRIVATE_IMAGE_SAVE,
    onMessage: contentMessageReceived
  };
}
