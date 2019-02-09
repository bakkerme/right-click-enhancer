const getBrowserObject = () => (typeof browser !== 'undefined' ? browser : chrome);

export { getBrowserObject };
