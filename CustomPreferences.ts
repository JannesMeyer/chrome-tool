import Storage from './SyncStorage';

export default class Preferences {

  constructor(defaults) {
    this.defaults = defaults;
  }

  /**
   * Requests one ore more preference values and
   * returns the value itself or an object containing
   * all keys and values
   */
  get(...keys) {
    var defaults = filterObject(containedIn(keys), this.defaults);
    var results = Storage.get(defaults);

    // Return either a single value or an array
    if (keys.length === 1) {
      return results.then(obj => obj[keys[0]]);
    } else {
      return results;
    }
  }

  /**
   * Requests all preferences values
   */
  getAll() {
    return Storage.get(null);
  }

  /**
   * Sets multiple preference values
   */
  set(items) {
    return Storage.set(items);
  }

}

/**
 * Filters an object (works like Array.prototype.filter)
 */
function filterObject(fn, obj) {
  var result = {};
  Object.keys(obj).filter(fn).forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

/**
 * Returns a function that will check if the value is contained
 * in the array
 */
function containedIn(arr) {
  return function(value) {
    return (arr.indexOf(value) !== -1);
  };
}