/**
 * ContextMenuItem that can appear in various places in the browser.
 * 
 * Documentation:
 * https://developer.chrome.com/extensions/contextMenus#toc
 */
export default class ContextMenuItem {

  props: chrome.contextMenus.CreateProperties;

  /**
   * Instantiate a context menu item (but don't show it yet)
   */
  constructor(props: chrome.contextMenus.CreateProperties) {
    this.props = Object.assign({}, props);
  }

  setVisible(visible) {
    if (visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    chrome.contextMenus.create(this.props);
  }

  hide() {
    chrome.contextMenus.remove(this.props.id);
  }

}