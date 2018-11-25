import { INPRIVATE_IMAGE_SAVE } from '../plugins';

function contentMessageReceived(e) {
  console.error(e);
  const { src } = e;

  if (!src) {
    console.error('Removing InPrivate Save Original menu');
    browser.contextMenus.removeAll();
    return;
  }

  console.error('Creating context menu item');
  const onContextMenuItemClick = onClicked(src);
  browser.contextMenus.create({
    id: "inprivate-image-save",
    title: 'Save original image',
    contexts: ["all"],
    onclick: onContextMenuItemClick,
  });
}

const onClicked = (url) => () => {
  browser.contextMenus.removeAll();
  console.error('Clicked Save!');
}

export default function registerPlugin() {
  return {
    id: INPRIVATE_IMAGE_SAVE,
    onMessage: contentMessageReceived
  };
}
