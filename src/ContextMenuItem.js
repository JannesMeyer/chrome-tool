/*
 * Documentation:
 * https://developer.chrome.com/extensions/contextMenus#toc
 */

import { getString } from './i18n';

export default class ContextMenuItem {
  constructor(id, contexts, onclick) {
    this.props = {
      id,
      contexts,
      onclick,
      title: getString('context_menu_' + id)
    };

    // Bind methods
    this.setVisible = this.setVisible.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  setVisible(show) {
    if (show) {
      this.show();
    } else {
      this.hide();
    }
    return this;
  }

  show() {
    chrome.contextMenus.create(Object.assign({}, this.props));
    return this;
  }

  hide() {
    chrome.contextMenus.remove(this.props.id);
    return this;
  }
}