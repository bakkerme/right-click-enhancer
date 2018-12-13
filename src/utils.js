const getBrowserObject = () => (typeof chrome !== 'undefined' ? chrome : browser);

export { getBrowserObject };
