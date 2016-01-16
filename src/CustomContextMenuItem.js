// https://developer.chrome.com/extensions/contextMenus#toc

export default class ContextMenuItem {

  /**
   * Create a context menu item for this extension.
   *
   * @param props { id, contexts, onclick, title }
   */
  constructor(props) {
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