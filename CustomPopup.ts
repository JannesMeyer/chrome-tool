import Runtime from './Runtime';
import Windows from './Windows';

interface IPopupArguments {
  url: string;
  params: string;
  width: number;
  height: number;
  parent: {
    width: number;
    height: number;
    left: number;
    top: number;
  }
}

/**
 * Opens a popup. Only one instance at a time is supported.
 */
export default class Popup {

  promise: Promise<any>;
  
  constructor({ url, params, width, height, parent }: IPopupArguments) {
    // Listen for the closing of the popup
    this.promise = new Promise((resolve, reject) => {
      Runtime.onMessage('popup_close', data => {
        Runtime.onMessage('popup_close', null);
        resolve(data);
      });
    });

    Windows.create({
      type: 'popup',
      url: Runtime.getURL(url) + (params || ''),
      left: Math.round(parent.left + (parent.width - width) / 2),
      top: Math.round(parent.top + (parent.height - height) / 3),
      width,
      height,
    });
  }

}